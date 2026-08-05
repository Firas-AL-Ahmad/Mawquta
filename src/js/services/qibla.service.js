// src/js/services/qibla.service.js
// Local Qibla calculation service. Accepts a normalized location, resolves the
// coordinates (existing coords / curated default Damascus / one deduped
// geocode lookup), computes the great-circle bearing locally and builds the
// provider-independent Qibla contract.
//
// The module never touches the DOM, never calls the AlAdhan Qibla endpoint and
// never requests geolocation. The geocode lookup function is injected so tests
// (and main.js) can supply their own coordinate resolution.

import { CONFIG } from "../config/app.config.js";
import {
  calculateQiblaBearing,
  formatDisplayDegrees,
} from "../utils/qibla.util.js";
import { requireValue } from "../utils/validation.util.js";

export function buildQiblaLocationKey(location) {
  if (!location || typeof location !== "object") {
    throw new Error("qibla service: location is required");
  }

  const type = location.type === "coords" ? "coords" : "city";

  if (type === "coords") {
    const lat = Number(location.latitude).toFixed(4);
    const lon = Number(location.longitude).toFixed(4);
    return `coords:${lat},${lon}`;
  }

  requireValue(location.city, "city");
  requireValue(location.country, "country");
  return `city:${location.city}|${location.country}`;
}

export function isDefaultDamascus(location) {
  return Boolean(
    location &&
      location.city === "Damascus" &&
      location.country === "Syria",
  );
}

function formatCityName(location) {
  if (!location) return "الموقع غير محدد";
  if (isDefaultDamascus(location)) {
    return "دمشق، سوريا";
  }
  return `${location.city}، ${location.country}`;
}

export function buildQiblaContract({
  location,
  latitude,
  longitude,
  calculatedAt,
}) {
  const locationKey = buildQiblaLocationKey(location);
  const qiblaBearing = calculateQiblaBearing(latitude, longitude);

  return Object.freeze({
    locationKey,
    cityName: formatCityName(location),
    latitude,
    longitude,
    qiblaBearing,
    displayDegrees: formatDisplayDegrees(qiblaBearing),
    compassRotation: qiblaBearing,
    source: "local-calculation",
    calculatedAt:
      calculatedAt instanceof Date
        ? calculatedAt.toISOString()
        : calculatedAt,
  });
}

export function createQiblaService(options = {}) {
  const {
    geocodeCity = async () => {
      throw new Error("qibla service: no coordinate lookup provided");
    },
    now = () => new Date(),
  } = options;

  // Same-session lookup cache keyed by "city|country" so a coordinate-less
  // city is geocoded at most once per service lifetime (in-flight dedupe).
  const lookupCache = new Map();

  async function resolveCoordinates(location) {
    if (location.type === "coords") {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    const latitudeValue = location.latitude;
    const longitudeValue = location.longitude;
    const hasCoords =
      latitudeValue !== null &&
      latitudeValue !== undefined &&
      latitudeValue !== "" &&
      longitudeValue !== null &&
      longitudeValue !== undefined &&
      longitudeValue !== "" &&
      Number.isFinite(Number(latitudeValue)) &&
      Number.isFinite(Number(longitudeValue));

    if (hasCoords) {
      return {
        latitude: Number(latitudeValue),
        longitude: Number(longitudeValue),
      };
    }

    if (isDefaultDamascus(location)) {
      return { ...CONFIG.DEFAULT_LOCATION_COORDS };
    }

    const cityKey = `${location.city}|${location.country}`;

    if (lookupCache.has(cityKey)) {
      return lookupCache.get(cityKey);
    }

    const promise = geocodeCity(location.city, location.country).then(
      (result) => {
        const latitude = Number(result?.latitude);
        const longitude = Number(result?.longitude);

        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          latitude < -90 ||
          latitude > 90 ||
          longitude < -180 ||
          longitude > 180
        ) {
          throw new Error(
            "qibla service: coordinate lookup returned invalid coordinates",
          );
        }

        return { latitude, longitude };
      },
    );

    lookupCache.set(cityKey, promise);

    try {
      return await promise;
    } catch (error) {
      lookupCache.delete(cityKey);
      throw error;
    }
  }

  async function getByLocation(location) {
    if (!location || typeof location !== "object") {
      throw new Error("qibla service: location is required");
    }

    const { latitude, longitude } = await resolveCoordinates(location);

    return buildQiblaContract({
      location,
      latitude,
      longitude,
      calculatedAt: now(),
    });
  }

  return Object.freeze({
    getByLocation,
    resolveCoordinates,
    buildQiblaContract,
    buildQiblaLocationKey,
  });
}
