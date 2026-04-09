function renderFooterSocialItem(item) {
  return `
    <a class="footer-social-inline__item" href="${item.href}" aria-label="${item.ariaLabel}">
      <img src="${item.iconPath}" alt="" aria-hidden="true" />
      <span>${item.label}</span>
    </a>
  `;
}

export function renderFooterSocialLinks(iconPaths) {
  const socialLinks = [
    {
      href: "#",
      ariaLabel: "Instagram",
      iconPath: iconPaths.instagram,
      label: "@firas_a7mad",
    },
    {
      href: "#",
      ariaLabel: "LinkedIn",
      iconPath: iconPaths.linkedin,
      label: "Firas AL-Ahmad",
    },
    {
      href: "#",
      ariaLabel: "GitHub",
      iconPath: iconPaths.github,
      label: "Firas AL-Ahmad",
    },
  ];

  return `
    <div class="footer-social-inline" aria-label="وسائل التواصل الاجتماعي">
      ${socialLinks.map((item) => renderFooterSocialItem(item)).join("\n")}
    </div>
  `;
}
