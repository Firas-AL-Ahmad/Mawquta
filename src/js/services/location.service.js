import { CONFIG } from "../config/app.config.js";
import {
  requireLatitude,
  requireLongitude,
  requireTimezone,
  requireValue,
} from "../utils/validation.util.js";

const LOCATION_SOURCES = new Set([
  "user",
  "stored",
  "geolocation",
  "default",
]);

function normalizeText(value, fieldName) {
  const normalized = String(value ?? "").trim();
  requireValue(normalized, fieldName);
  return normalized;
}

function normalizeOptionalCoordinate(value, validator) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const normalized = Number(value);
  validator(normalized);
  return normalized;
}

export function normalizeLocation(candidate, source = candidate?.source) {
  if (!candidate || typeof candidate !== "object") {
    throw new Error("location must be an object");
  }

  const type = candidate.type === "coords" ? "coords" : "city";
  const city = normalizeText(candidate.city, "city");
  const country = normalizeText(candidate.country, "country");
  const latitude = normalizeOptionalCoordinate(
    candidate.latitude ?? candidate.lat,
    requireLatitude,
  );
  const longitude = normalizeOptionalCoordinate(
    candidate.longitude ?? candidate.lon,
    requireLongitude,
  );
  const timezone = normalizeText(candidate.timezone, "timezone");
  requireTimezone(timezone);

  if (type === "coords" && (latitude === null || longitude === null)) {
    throw new Error("coordinate locations require latitude and longitude");
  }

  if (!LOCATION_SOURCES.has(source)) {
    throw new Error("location source is invalid");
  }

  return Object.freeze({
    type,
    city,
    country,
    latitude,
    longitude,
    timezone,
    source,
  });
}

function toPersistedLocation(location) {
  return {
    type: location.type,
    city: location.city,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone,
  };
}

function resolveStorage(storage) {
  if (storage !== undefined) return storage;

  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function createLocationService(options = {}) {
  const storage = resolveStorage(options.storage);
  const storageKey = options.storageKey || CONFIG.STORAGE_KEY;
  const defaultLocation = normalizeLocation(
    options.defaultLocation || CONFIG.DEFAULT_LOCATION,
    "default",
  );
  const listeners = new Set();

  let state = Object.freeze({
    phase: "idle",
    location: null,
    error: null,
    requestId: 0,
  });

  function notify() {
    for (const listener of listeners) {
      listener(state);
    }
  }

  function setState(nextState) {
    state = Object.freeze(nextState);
    notify();
    return state;
  }

  function removePersistedLocation() {
    if (!storage) return false;

    try {
      storage.removeItem(storageKey);
      return true;
    } catch {
      return false;
    }
  }

  function readPersistedLocation() {
    if (!storage) return null;

    try {
      const raw = storage.getItem(storageKey);
      if (!raw) return null;

      return normalizeLocation(JSON.parse(raw), "stored");
    } catch {
      removePersistedLocation();
      return null;
    }
  }

  function persistAcceptedLocation(location) {
    if (!storage) return false;

    try {
      storage.setItem(storageKey, JSON.stringify(toPersistedLocation(location)));
      return true;
    } catch {
      return false;
    }
  }

  function initialize() {
    const location = readPersistedLocation() || defaultLocation;
    return setState({
      phase: "ready",
      location,
      error: null,
      requestId: state.requestId,
    });
  }

  function beginRequest() {
    const requestId = state.requestId + 1;
    setState({
      phase: "loading",
      location: state.location,
      error: null,
      requestId,
    });
    return requestId;
  }

  function isRequestCurrent(requestId) {
    return requestId === state.requestId;
  }

  function completeCandidateRequest(requestId) {
    if (!isRequestCurrent(requestId)) return false;

    setState({
      phase: state.location ? "ready" : "idle",
      location: state.location,
      error: null,
      requestId,
    });
    return true;
  }

  function failRequest(requestId, error) {
    if (!isRequestCurrent(requestId)) return false;

    setState({
      phase: state.location ? "ready" : "error",
      location: state.location,
      error: {
        code: "LOCATION_RESOLUTION_FAILED",
        message: String(error?.message || "تعذر تحديد الموقع"),
      },
      requestId,
    });
    return true;
  }

  function cancelPendingRequest() {
    const requestId = state.requestId + 1;
    setState({
      phase: state.location ? "ready" : "idle",
      location: state.location,
      error: null,
      requestId,
    });
    return requestId;
  }

  function acceptLocation(candidate, source, requestToken = null) {
    if (requestToken !== null && !isRequestCurrent(requestToken)) {
      return false;
    }

    const location = normalizeLocation(candidate, source);
    const requestId = state.requestId + 1;

    setState({
      phase: "ready",
      location,
      error: null,
      requestId,
    });
    persistAcceptedLocation(location);
    return true;
  }

  function resetToDefault() {
    removePersistedLocation();
    const requestId = state.requestId + 1;
    return setState({
      phase: "ready",
      location: defaultLocation,
      error: null,
      requestId,
    });
  }

  function subscribe(listener) {
    if (typeof listener !== "function") {
      return () => {};
    }

    listeners.add(listener);
    listener(state);
    return () => listeners.delete(listener);
  }

  return Object.freeze({
    initialize,
    getState: () => state,
    subscribe,
    beginRequest,
    isRequestCurrent,
    completeCandidateRequest,
    failRequest,
    cancelPendingRequest,
    acceptLocation,
    resetToDefault,
  });
}
