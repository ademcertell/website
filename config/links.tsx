type FooterLink = {
  id: number;
  links: {
    href: string;
    title: string;
  }[];
}[];

type FooterSocialMediaLinks = {
  href: string;
  title: string;
}[];

export const FOOTER_LINK: FooterLink = [
  {
    id: 1,
    links: [
      {
        href: "/",
        title: "Home",
      },
      {
        href: "/about",
        title: "About",
      },
      {
        href: "/post",
        title: "Posts",
      },
      {
        href: "/repository",
        title: "Repository",
      },
    ],
  },
];

export const FOOTER_SOCIAL_MEDIA: FooterSocialMediaLinks = [
  {
    href: "https://www.instagram.com/ademcertell/",
    title: "Instagram",
  },
  {
    href: "https://github.com/ademcertell",
    title: "GitHub",
  },
  {
    href: "https://twitter.com/ademcertell",
    title: "Twitter",
  },
  {
    href: "https://www.youtube.com/channel/UC3sLnNIrakZRPJEOnzCKerQ",
    title: "YouTube",
  }
];
