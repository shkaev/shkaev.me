import type { Locale } from "./config";

export interface WorkTimelineItem {
	role: string;
	company: string;
	favicon?: string;
	href?: string;
	period: string;
	contractType: string;
	intro: string;
}

export interface RecommendationItem {
	name: string;
	href: string;
	favicon?: string;
	role: string;
	avatar?: string;
	text: string;
}

export interface AboutPageCopy {
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	title: string;
	lead: string;
	workTimeline: WorkTimelineItem[];
	seeMoreLabel: (count: number) => string;
	strengthsTitle: string;
	strengthsParagraphs: string[];
	recommendationsTitle: string;
	recommendationsLeadBeforeLink: string;
	recommendationsLeadLinkLabel: string;
	recommendationsLeadAfterLink: string;
	recommendations: RecommendationItem[];
	prevRecommendationAriaLabel: string;
	nextRecommendationAriaLabel: string;
	leadershipTitle: string;
	leadershipParagraph: string;
	hobbiesTitle: string;
	hobbiesParagraphs: string[];
	contactTitle: string;
	contactLeadBeforeCity: string;
	contactCity: string;
	contactLeadAfterCity: string;
	contactLinkLabel: string;
	contactLeadAfterLink: string;
}

const aboutPageCopy: Record<Locale, AboutPageCopy> = {
	en: {
		metaTitle: "About | Dmitry Shkaev",
		metaDescription: "About Dmitry Shkaev, his photography, and his product design background.",
		eyebrow: "About me",
		title: "Product designer with 10+ years of experience",
		lead: "My background is in building customer-facing enterprise software across desktop and mobile. I’m best at creating meaningful user-centered design that helps businesses reach their goals and leaves people feeling great, inspired, and cared for. Currently, I’m driving interaction metrics for a high-impact product with tens of millions of monthly active users.",
		workTimeline: [
			{
				role: "Senior Product Designer",
				company: "Mayflower",
				favicon: "/favicons/mayflower.ico",
				href: "https://mayflower.work",
				period: "April 2023 — Present",
				contractType: "Full-time, Office",
				intro:
					"Turning business ideas and user feedback into designs that are both fun and work well. Learning fast from qualitative and quantitative data. Designing and shipping across key interaction areas. Fixing what matters most. Making things people understand easily and enjoy genuinely."
			},
			{
				role: "Senior Product Designer",
				company: "Avast Software",
				favicon: "/favicons/avast.ico",
				href: "https://www.linkedin.com/company/avast-software/",
				period: "May 2019 — Dec 2022",
				contractType: "Full-time, Remote",
				intro:
					"Worked on privacy products including AntiTrack, BreachGuard, SecureLine VPN, and Avast Online Security & Privacy. Designed and shipped features across desktop and mobile, turning complex privacy concepts into simple, usable experiences. Contributed to design system work and mentored designers."
			},
			{
				role: "Product Designer",
				company: "TrackOFF",
				favicon: "/favicons/trackoff.png",
				href: "https://www.linkedin.com/company/trackoff/",
				period: "Jun 2015 — Jul 2019",
				contractType: "Contract, Remote",
				intro:
					"I joined the startup as employee number two and helped build an innovative privacy product from the ground up. It performed strongly, and after four years the company was acquired by Avast, where we continued our journey as part of a larger organization."
			},
			{
				role: "Freelance Designer",
				company: "Independent practice",
				period: "Apr 2015 — Jul 2017",
				contractType: "Self-employed",
				intro:
					"Worked on design projects for clients worldwide. In my spare time, I explored web and landing page contests as a way to sharpen my skills and generate additional income."
			},
			{
				role: "Web Designer",
				company: "Perfecto",
				favicon: "/favicons/perfecto.jpg",
				href: "https://www.linkedin.com/company/perfecto-mobile/",
				period: "Jun 2011 — May 2015",
				contractType: "Full-time, Office",
				intro:
					"During my first year, I focused primarily on managing content for the company's websites. Over time, I transitioned into web- and product design, contributing to dozens of successfully delivered projects. It was an exciting period of growth, working alongside talented people and gaining hands-on experience that shaped my foundation in design."
			},
			{
				role: "PR & Project Manager",
				company: "Omsk Chamber of Commerce",
				favicon: "/favicons/tpprf.ico",
				href: "https://omsk.tpprf.ru/",
				period: "Mar 2008 — Jun 2011",
				contractType: "Full-time, Office",
				intro:
					"My responsibilities included managing the company’s websites, writing daily news articles, and communicating with clients, as well as overseeing print production from design to distribution. I also represented the company at business and government events and contributed to shaping its public image."
			}
		],
		seeMoreLabel: (count) => `See ${count} more`,
		strengthsTitle: "Strengths & skills",
		strengthsParagraphs: [
			"My core strength is solving complex problems through elegant, well-reasoned solutions and turning them into clear, functional interfaces. There’s no magic behind it — just experience, pattern recognition, and a disciplined design approach.",
			"I’m often told that I have an eye for perfection when it comes to crafting high-fidelity UI, and I would consider this to be my second strongest trait. Wireframes and early concepts can and should be wild, but when it comes to the final product, it’s pixel-perfect or death. Just kidding, but yes, my Figma stuff is pretty neat."
		],
		recommendationsTitle: "Recommendations",
		recommendationsLeadBeforeLink: "Here are some quotes from the colleagues and clients I’ve worked with over the years. They offer an external perspective on my work, collaboration style, and overall contribution across different roles and projects. Originally shared on ",
		recommendationsLeadLinkLabel: "LinkedIn",
		recommendationsLeadAfterLink: ".",
		recommendations: [
			{
				name: "Bulat Meshkov",
				href: "https://www.linkedin.com/in/bulatmeshkov/",
				favicon: "/favicons/exness.png",
				role: "Senior Product Designer, Exness",
				avatar: "/avatars/avatar-review-16.jpg",
				text:
					"“Dmitry is very passionate about the user experience, always advocating for solutions that put user’s needs in the center of the discussion.”"
			},
			{
				name: "Aleksandr Kiselev",
				href: "https://www.linkedin.com/in/aleksandr-kiselev-41a228271",
				favicon: "/favicons/mayflower.ico",
				role: "Senior Fullstack Developer, Mayflower",
				avatar: "/avatars/avatar-review-17.jpg",
				text:
					"“We successfully delivered complex and visually impressive features, finding the perfect balance between design excellence and implementation.”"
			},
			{
				name: "Yurii Korotun",
				href: "https://www.linkedin.com/in/yurii-korotun/",
				favicon: "/favicons/gen.png",
				role: "Senior Principal Product Manager, Gen",
				avatar: "/avatars/avatar-review-15.jpg",
				text:
					"“A remarkable eye for detail and a comprehensive understanding of what it takes to design an interface that is both functional and attractive.”"
			},
			{
				name: "Ron Ward",
				href: "https://www.linkedin.com/in/ron-ward-jr/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Manager, Avast Software",
				avatar: "/avatars/avatar-review-13.jpg",
				text:
					"“Dmitry kept a positive outlook throughout many challenges. [...] He is always customer-focused and has a very keen attention to detail.”"
			},
			{
				name: "Natalie Schinkova",
				href: "https://www.linkedin.com/in/natalie-schinkova/",
				favicon: "/favicons/avast.ico",
				role: "Product Manager, Avast Software",
				avatar: "/avatars/avatar-review-12.jpg",
				text:
					"“As a former UX researcher turned PM, I especially appreciated Dima's user centricity and his ability to turn research findings into relevant design changes.”"
			},
			{
				name: "Victoria Usan",
				href: "https://www.linkedin.com/in/victoriausan/",
				favicon: "/favicons/avast.ico",
				role: "QA Engineer, Avast Software",
				avatar: "/avatars/avatar-review-14.jpg",
				text:
					"“Dima dedicated much of his time to helping me grow as a professional. [...] It was an absolute pleasure to work with him on each of our projects.”"
			},
			{
				name: "Anton Gilyov",
				href: "https://www.linkedin.com/in/gilyov/",
				favicon: "/favicons/avast.ico",
				role: "Senior Frontend Developer, Avast Software",
				avatar: "/avatars/avatar-review-1.jpg",
				text:
					"“He is one of the most professional and responsible people I have ever met.”"
			},
			{
				name: "Jon Schubbe",
				href: "https://www.linkedin.com/in/jon-schubbe-327aa613/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-11.jpg",
				text:
					"“One of Dima's strongest suits is that he delivers.”"
			},
			{
				name: "Jan Marek",
				href: "https://www.linkedin.com/in/jan-marek-52453848/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-10.jpg",
				text:
					"“He has a deep understanding of user experience and user interface design principles.”"
			},
			{
				name: "Jiří Pojezný",
				href: "https://www.linkedin.com/in/ji%C5%99%C3%AD-pojezn%C3%BD-6a322765/",
				favicon: "/favicons/avast.ico",
				role: "Senior Frontend Developer, Avast Software",
				text:
					"“Dima is super friendly and super responsive. He's always there for his colleagues.”"
			},
			{
				name: "Ilja Panić",
				href: "https://www.linkedin.com/in/iljapanic/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-9.jpg",
				text:
					"“He is one of the most dependable and talented designers I've collaborated with in the past 10 years.”"
			},
			{
				name: "Elena Ukolova",
				href: "https://www.linkedin.com/in/elenaukolova/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-8.jpg",
				text:
					"“If I had a question on Figma or Design System, he was always a person to ask and to receive the deepest answer.”"
			},
			{
				name: "Alysa Yamada",
				href: "https://www.linkedin.com/in/alyyamada/",
				favicon: "/favicons/avast.ico",
				role: "UX Writer, Avast Software",
				avatar: "/avatars/avatar-review-7.jpg",
				text:
					"“His ability to organize concepts and simplify processes for everyone is pretty magical to experience.”"
			},
			{
				name: "Chandler Givens",
				href: "https://www.linkedin.com/in/chandler-givens-42a6184/",
				favicon: "/favicons/trackoff.png",
				role: "CEO, TrackOFF",
				avatar: "/avatars/avatar-review-2.jpg",
				text:
					"“Dima is a wonderful designer.”"
			},
			{
				name: "Ryan Flach",
				href: "https://www.linkedin.com/in/ryan-flach-1647b1ba/",
				favicon: "/favicons/trackoff.png",
				role: "CTO, TrackOFF",
				avatar: "/avatars/avatar-review-5.jpg",
				text:
					"“Dima is prompt and dependable, always offers a quick turnaround, and provides the highest quality deliverables. His eye for detail cannot be understated.”"
			},
			{
				name: "Andrey Perfilev",
				href: "https://www.linkedin.com/in/perfilev/",
				favicon: "/favicons/nitroseller.png",
				role: "CEO, Nitroseller",
				avatar: "/avatars/avatar-review-6.jpg",
				text:
					"“Dmitry is a very skilled product designer. Strongly recommended!”"
			},
			{
				name: "Vladimir Rybas",
				href: "https://www.linkedin.com/in/vrybas/",
				favicon: "/favicons/typeform.ico",
				role: "Expert Software Engineer, Typeform",
				avatar: "/avatars/avatar-review-3.jpg",
				text:
					"“He is a very talented and hardworking person.”"
			},
			{
				name: "Faizan J. Khan",
				href: "https://www.linkedin.com/in/faizanjkhan/",
				favicon: "/favicons/visary.png",
				role: "CIO, VISARY",
				avatar: "/avatars/avatar-review-4.jpg",
				text:
					"“Dmitry gets it done.”"
			}
		],
		prevRecommendationAriaLabel: "Previous recommendation",
		nextRecommendationAriaLabel: "Next recommendation",
		leadershipTitle: "Leadership",
		leadershipParagraph:
			"While I bring the most value as an individual contributor, I have experience leading creative initiatives within business goals and working closely with small, focused teams. I’m often involved in onboarding new hires and helping them get up to speed, and I’ve taken on mentoring responsibilities to support junior designers and guide them through design processes.",
		hobbiesTitle: "Hobbies",
		hobbiesParagraphs: [
			"My main passion is photography, which I’ve been practicing for quite some time, starting back when film cameras were still the mainstream. At one point, I was comfortable enough to turn it into a side gig, even securing contracts with companies like Omsk Carbon Group to shoot portraits and environments.",
			"Another major activity for me is cycling — there’s nothing better than hopping on a bike, exploring new places, and meeting people along the way. It also naturally complements my photography.",
			"And, as a family man, I spend a lot of time with my wife Olga and our two sons, Boris and Gleb."
		],
		contactTitle: "Contact info",
		contactLeadBeforeCity: "I’m located in 🇨🇾 ",
		contactCity: "Limassol",
		contactLeadAfterCity: " and always open to meeting new people. Feel free to hit me up on ",
		contactLinkLabel: "Telegram",
		contactLeadAfterLink: "."
	},
	ru: {
		metaTitle: "Обо мне | Дмитрий Шкаев",
		metaDescription: "О Дмитрии Шкаеве, его фотографии и опыте в продуктовом дизайне.",
		eyebrow: "Обо мне",
		title: "Продуктовый дизайнер с опытом более 10 лет",
		lead: "Мой бэкграунд — это проектирование клиентского enterprise-софта для десктопа и мобильных платформ. Сильнее всего я в создании осмысленного пользовательского дизайна, который помогает бизнесу достигать целей и при этом оставляет у людей ощущение ясности, заботы и вдохновения. Сейчас я отвечаю за interaction metrics в высокоимпактном продукте с десятками миллионов активных пользователей в месяц.",
		workTimeline: [
			{
				role: "Senior Product Designer",
				company: "Mayflower",
				favicon: "/favicons/mayflower.ico",
				href: "https://mayflower.work",
				period: "Апрель 2023 — настоящее время",
				contractType: "Полная занятость, офис",
				intro:
					"Превращаю бизнес-идеи и пользовательский фидбек в дизайн, который одновременно интересен и эффективен. Быстро учусь на качественных и количественных данных. Проектирую и вывожу в прод ключевые зоны взаимодействия. Чиню то, что действительно важно. Делаю вещи, которые людям легко понять и приятно использовать."
			},
			{
				role: "Senior Product Designer",
				company: "Avast Software",
				favicon: "/favicons/avast.ico",
				href: "https://www.linkedin.com/company/avast-software/",
				period: "Май 2019 — Декабрь 2022",
				contractType: "Полная занятость, удалённо",
				intro:
					"Работал над privacy-продуктами, включая AntiTrack, BreachGuard, SecureLine VPN и Avast Online Security & Privacy. Проектировал и выпускал функции для десктопа и мобильных платформ, превращая сложные приватностные концепции в простые и понятные интерфейсы. Участвовал в развитии дизайн-системы и менторил дизайнеров."
			},
			{
				role: "Product Designer",
				company: "TrackOFF",
				favicon: "/favicons/trackoff.png",
				href: "https://www.linkedin.com/company/trackoff/",
				period: "Июнь 2015 — Июль 2019",
				contractType: "Контракт, удалённо",
				intro:
					"Я пришёл в стартап вторым сотрудником и помогал строить инновационный privacy-продукт с самого нуля. Он показал сильные результаты, и спустя четыре года компанию купил Avast, где наше развитие продолжилось уже внутри более крупной организации."
			},
			{
				role: "Freelance Designer",
				company: "Independent practice",
				period: "Апрель 2015 — Июль 2017",
				contractType: "Частная практика",
				intro:
					"Работал над дизайнерскими проектами для клиентов по всему миру. В свободное время участвовал в конкурсах веб- и лендинг-страниц, чтобы прокачивать навыки и получать дополнительный доход."
			},
			{
				role: "Web Designer",
				company: "Perfecto",
				favicon: "/favicons/perfecto.jpg",
				href: "https://www.linkedin.com/company/perfecto-mobile/",
				period: "Июнь 2011 — Май 2015",
				contractType: "Полная занятость, офис",
				intro:
					"В первый год я в основном занимался контентом для сайтов компании. Со временем перешёл в веб- и продуктовый дизайн, поучаствовав в десятках успешно выпущенных проектов. Это был очень важный период роста: работа рядом с сильными людьми и постоянная практика заложили фундамент моего дизайнерского подхода."
			},
			{
				role: "PR & Project Manager",
				company: "Omsk Chamber of Commerce",
				favicon: "/favicons/tpprf.ico",
				href: "https://omsk.tpprf.ru/",
				period: "Март 2008 — Июнь 2011",
				contractType: "Полная занятость, офис",
				intro:
					"В мои обязанности входило ведение сайтов компании, написание ежедневных новостей и коммуникация с клиентами, а также контроль печатной продукции — от дизайна до распространения. Кроме того, я представлял компанию на деловых и государственных мероприятиях и участвовал в формировании её публичного образа."
			}
		],
		seeMoreLabel: (count) => `Показать ещё ${count}`,
		strengthsTitle: "Сильные стороны и навыки",
		strengthsParagraphs: [
			"Моя ключевая сила — решение сложных задач через элегантные, хорошо продуманные решения с переводом всего этого в ясные и функциональные интерфейсы. Никакой магии тут нет — только опыт, насмотренность и дисциплинированный подход к дизайну.",
			"Мне часто говорят, что у меня есть чувство перфекционизма, когда дело доходит до high-fidelity UI, и я бы назвал это своей второй по силе стороной. Wireframes и ранние концепции могут и должны быть дикими, но если речь идёт о финальном продукте — там уже либо pixel-perfect, либо смерть. Шучу, но да, в Figma у меня обычно всё очень аккуратно."
		],
		recommendationsTitle: "Рекомендации",
		recommendationsLeadBeforeLink: "Ниже — несколько цитат от коллег и клиентов, с которыми я работал в разные годы. Это взгляд со стороны на мою работу, стиль взаимодействия и общий вклад в самых разных ролях и проектах. Изначально опубликованы в ",
		recommendationsLeadLinkLabel: "LinkedIn",
		recommendationsLeadAfterLink: ".",
		recommendations: [
			{
				name: "Bulat Meshkov",
				href: "https://www.linkedin.com/in/bulatmeshkov/",
				favicon: "/favicons/exness.png",
				role: "Senior Product Designer, Exness",
				avatar: "/avatars/avatar-review-16.jpg",
				text:
					"«Дмитрий очень увлечён пользовательским опытом и всегда продвигает решения, которые ставят потребности пользователя в центр обсуждения.»"
			},
			{
				name: "Aleksandr Kiselev",
				href: "https://www.linkedin.com/in/aleksandr-kiselev-41a228271",
				favicon: "/favicons/mayflower.ico",
				role: "Senior Fullstack Developer, Mayflower",
				avatar: "/avatars/avatar-review-17.jpg",
				text:
					"«Мы успешно выпускали сложные и визуально впечатляющие функции, находя идеальный баланс между качеством дизайна и реализацией.»"
			},
			{
				name: "Yurii Korotun",
				href: "https://www.linkedin.com/in/yurii-korotun/",
				favicon: "/favicons/gen.png",
				role: "Senior Principal Product Manager, Gen",
				avatar: "/avatars/avatar-review-15.jpg",
				text:
					"«У него выдающееся внимание к деталям и глубокое понимание того, что нужно, чтобы интерфейс был одновременно функциональным и привлекательным.»"
			},
			{
				name: "Ron Ward",
				href: "https://www.linkedin.com/in/ron-ward-jr/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Manager, Avast Software",
				avatar: "/avatars/avatar-review-13.jpg",
				text:
					"«Дмитрий сохранял позитивный настрой даже во времена множества сложностей. [...] Он всегда ориентирован на клиента и обладает очень тонким вниманием к деталям.»"
			},
			{
				name: "Natalie Schinkova",
				href: "https://www.linkedin.com/in/natalie-schinkova/",
				favicon: "/favicons/avast.ico",
				role: "Product Manager, Avast Software",
				avatar: "/avatars/avatar-review-12.jpg",
				text:
					"«Как бывший UX-исследователь, ставший PM, я особенно ценила ориентированность Димы на пользователя и его способность превращать выводы исследований в релевантные дизайн-изменения.»"
			},
			{
				name: "Victoria Usan",
				href: "https://www.linkedin.com/in/victoriausan/",
				favicon: "/favicons/avast.ico",
				role: "QA Engineer, Avast Software",
				avatar: "/avatars/avatar-review-14.jpg",
				text:
					"«Дима посвятил много времени тому, чтобы помочь мне расти профессионально. [...] Работать с ним над каждым нашим проектом было абсолютным удовольствием.»"
			},
			{
				name: "Anton Gilyov",
				href: "https://www.linkedin.com/in/gilyov/",
				favicon: "/favicons/avast.ico",
				role: "Senior Frontend Developer, Avast Software",
				avatar: "/avatars/avatar-review-1.jpg",
				text:
					"«Это один из самых профессиональных и ответственных людей, которых я когда-либо встречал.»"
			},
			{
				name: "Jon Schubbe",
				href: "https://www.linkedin.com/in/jon-schubbe-327aa613/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-11.jpg",
				text:
					"«Одна из сильнейших сторон Димы — он доводит дело до результата.»"
			},
			{
				name: "Jan Marek",
				href: "https://www.linkedin.com/in/jan-marek-52453848/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-10.jpg",
				text:
					"«У него глубокое понимание принципов user experience и user interface design.»"
			},
			{
				name: "Jiří Pojezný",
				href: "https://www.linkedin.com/in/ji%C5%99%C3%AD-pojezn%C3%BD-6a322765/",
				favicon: "/favicons/avast.ico",
				role: "Senior Frontend Developer, Avast Software",
				text:
					"«Дима очень дружелюбный и очень отзывчивый. Он всегда рядом со своими коллегами.»"
			},
			{
				name: "Ilja Panić",
				href: "https://www.linkedin.com/in/iljapanic/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-9.jpg",
				text:
					"«Это один из самых надёжных и талантливых дизайнеров, с которыми я работал за последние 10 лет.»"
			},
			{
				name: "Elena Ukolova",
				href: "https://www.linkedin.com/in/elenaukolova/",
				favicon: "/favicons/avast.ico",
				role: "Senior Product Designer, Avast Software",
				avatar: "/avatars/avatar-review-8.jpg",
				text:
					"«Если у меня был вопрос по Figma или Design System, именно к нему всегда можно было пойти за самым глубоким ответом.»"
			},
			{
				name: "Alysa Yamada",
				href: "https://www.linkedin.com/in/alyyamada/",
				favicon: "/favicons/avast.ico",
				role: "UX Writer, Avast Software",
				avatar: "/avatars/avatar-review-7.jpg",
				text:
					"«Его способность структурировать идеи и упрощать процессы для всех — это почти магия в действии.»"
			},
			{
				name: "Chandler Givens",
				href: "https://www.linkedin.com/in/chandler-givens-42a6184/",
				favicon: "/favicons/trackoff.png",
				role: "CEO, TrackOFF",
				avatar: "/avatars/avatar-review-2.jpg",
				text:
					"«Дима — замечательный дизайнер.»"
			},
			{
				name: "Ryan Flach",
				href: "https://www.linkedin.com/in/ryan-flach-1647b1ba/",
				favicon: "/favicons/trackoff.png",
				role: "CTO, TrackOFF",
				avatar: "/avatars/avatar-review-5.jpg",
				text:
					"«Дима оперативен и надёжен, всегда быстро возвращается с результатом и выдаёт deliverables высочайшего качества. Его внимание к деталям невозможно переоценить.»"
			},
			{
				name: "Andrey Perfilev",
				href: "https://www.linkedin.com/in/perfilev/",
				favicon: "/favicons/nitroseller.png",
				role: "CEO, Nitroseller",
				avatar: "/avatars/avatar-review-6.jpg",
				text:
					"«Дмитрий — очень сильный продуктовый дизайнер. Искренне рекомендую!»"
			},
			{
				name: "Vladimir Rybas",
				href: "https://www.linkedin.com/in/vrybas/",
				favicon: "/favicons/typeform.ico",
				role: "Expert Software Engineer, Typeform",
				avatar: "/avatars/avatar-review-3.jpg",
				text:
					"«Он очень талантливый и трудолюбивый человек.»"
			},
			{
				name: "Faizan J. Khan",
				href: "https://www.linkedin.com/in/faizanjkhan/",
				favicon: "/favicons/visary.png",
				role: "CIO, VISARY",
				avatar: "/avatars/avatar-review-4.jpg",
				text:
					"«Дмитрий доводит дело до конца.»"
			}
		],
		prevRecommendationAriaLabel: "Предыдущая рекомендация",
		nextRecommendationAriaLabel: "Следующая рекомендация",
		leadershipTitle: "Лидерство",
		leadershipParagraph:
			"Хотя максимальную ценность я приношу как individual contributor, у меня есть опыт ведения креативных инициатив внутри бизнес-целей и тесной работы с небольшими сфокусированными командами. Я часто участвую в onboarding новых сотрудников, помогаю им быстрее встать на рельсы и брал на себя mentoring-роль, поддерживая junior-дизайнеров и проводя их через дизайн-процессы.",
		hobbiesTitle: "Хобби",
		hobbiesParagraphs: [
			"Моя главная страсть — фотография, которой я занимаюсь уже очень давно, ещё со времён, когда плёночные камеры были обычным делом. В какой-то момент я чувствовал себя достаточно уверенно, чтобы превратить её в side gig и даже брать контракты у компаний вроде Omsk Carbon Group на съёмку портретов и среды.",
			"Ещё одна важная часть моей жизни — велоспорт. Нет ничего лучше, чем сесть на велосипед, исследовать новые места и знакомиться с людьми по пути. И это естественным образом дополняет мою фотографию.",
			"Ну и, как семейный человек, я много времени провожу с женой Ольгой и нашими двумя сыновьями — Борисом и Глебом."
		],
		contactTitle: "Контакты",
		contactLeadBeforeCity: "Я живу в 🇨🇾 ",
		contactCity: "Лимасоле",
		contactLeadAfterCity: " и всегда открыт новым знакомствам. Если хочешь связаться, лучше всего написать мне в ",
		contactLinkLabel: "Telegram",
		contactLeadAfterLink: "."
	}
};

export const getAboutPageCopy = (locale: Locale) => aboutPageCopy[locale];
