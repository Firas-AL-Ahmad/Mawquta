function renderContactListItem(item) {
  return `
    <li>
      <a href="${item.href}">
        <img src="${item.iconPath}" alt="" aria-hidden="true" />
        <span>${item.label}</span>
      </a>
    </li>
  `;
}

export function renderFooterContactColumn(iconPaths) {
  const contactItems = [
    {
      href: "mailto:firas.al.ahmad.mail@gmail.com",
      iconPath: iconPaths.mail,
      label: "firas.al.ahmad.mail@gmail.com",
    },
    {
      href: "tel:+963937302533",
      iconPath: iconPaths.phone,
      label: "+963 937 302 533",
    },
  ];

  return `
    <div class="footer-main-col footer-main-col--contact">
      <p class="footer-heading">تواصل معنا</p>
      <ul class="footer-contact-list">
        ${contactItems.map((item) => renderContactListItem(item)).join("\n")}
      </ul>
    </div>
  `;
}
