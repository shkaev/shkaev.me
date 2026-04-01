export interface NavigationItem {
	href: string;
	label: string;
}

export interface SocialLink {
	href: string;
	label: string;
}

export const siteName = "Dmitry Shkaev";
export const siteUrl = "https://shkaev.me";

export const navigation: NavigationItem[] = [
	{ href: "/photography", label: "Photography" },
	{ href: "/design", label: "Design" },
	{ href: "/about", label: "About" }
];

export const socialLinks: SocialLink[] = [
	{
		href: "https://www.linkedin.com/in/shkaev/",
		label: "LinkedIn"
	},
	{
		href: "https://t.me/shkaev",
		label: "Telegram"
	},
	{
		href: "https://www.instagram.com/shkaev/",
		label: "Instagram"
	}
];

export const shellWidthClass = "max-w-[81.25rem]";
