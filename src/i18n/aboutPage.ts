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
		title: "Продуктовый дизайнер с более чем 10-летним опытом",
		lead: "Мой опыт — в создании цифровых продуктов для бизнеса с понятным и удобным пользовательским опытом. Я умею находить решения, которые одновременно работают на цели компании и делают взаимодействие с продуктом простым, приятным и осмысленным для людей. Сейчас я занимаюсь улучшением ключевых показателей взаимодействия в крупном продукте с десятками миллионов активных пользователей в месяц.",
		workTimeline: [
			{
				role: "Старший продуктовый дизайнер",
				company: "Mayflower",
				favicon: "/favicons/mayflower.ico",
				href: "https://mayflower.work",
				period: "Апрель 2023 — по настоящее время",
				contractType: "Полная занятость, офис",
				intro:
					"Превращаю бизнес-идеи и обратную связь пользователей в дизайн, который не только хорошо работает, но и увлекает. Быстро учусь на качественных и количественных данных. Проектирую и довожу до релиза ключевые сценарии взаимодействия. Исправляю то, что действительно влияет на результат. Делаю продукты, которые легко понять и приятно использовать."
			},
			{
				role: "Старший продуктовый дизайнер",
				company: "Avast Software",
				favicon: "/favicons/avast.ico",
				href: "https://www.linkedin.com/company/avast-software/",
				period: "Май 2019 — Декабрь 2022",
				contractType: "Полная занятость, удалённо",
				intro:
					"Работал над продуктами в сфере приватности, включая AntiTrack, BreachGuard, SecureLine VPN и Avast Online Security & Privacy. Проектировал и выпускал функции для десктопа и мобильных устройств, превращая сложные темы приватности в простые и понятные интерфейсы. Участвовал в развитии дизайн-системы и менторил дизайнеров."
			},
			{
				role: "Продуктовый дизайнер",
				company: "TrackOFF",
				favicon: "/favicons/trackoff.png",
				href: "https://www.linkedin.com/company/trackoff/",
				period: "Июнь 2015 — Июль 2019",
				contractType: "Контракт, удалённо",
				intro:
					"Я пришёл в стартап вторым сотрудником и помогал строить инновационный продукт для защиты приватности с нуля. Он показал сильные результаты, а спустя четыре года компанию купил Avast, где наша история продолжилась уже внутри более крупной организации."
			},
			{
				role: "Фриланс-дизайнер",
				company: "Частная практика",
				period: "Апрель 2015 — Июль 2017",
				contractType: "Частная практика",
				intro:
					"Работал над дизайн-проектами для клиентов по всему миру. В свободное время участвовал в конкурсах по веб- и лендинговому дизайну, чтобы прокачивать навыки и параллельно зарабатывать."
			},
			{
				role: "Веб-дизайнер",
				company: "Perfecto",
				favicon: "/favicons/perfecto.jpg",
				href: "https://www.linkedin.com/company/perfecto-mobile/",
				period: "Июнь 2011 — Май 2015",
				contractType: "Полная занятость, офис",
				intro:
					"В первый год я в основном занимался контентом для сайтов компании. Со временем переключился на веб- и продуктовый дизайн и поучаствовал в десятках успешно выпущенных проектов. Это был важный этап роста: работа рядом с сильными людьми и постоянная практика заложили фундамент моего подхода к дизайну."
			},
			{
				role: "PR- и проектный менеджер",
				company: "Омская торгово-промышленная палата",
				favicon: "/favicons/tpprf.ico",
				href: "https://omsk.tpprf.ru/",
				period: "Март 2008 — Июнь 2011",
				contractType: "Полная занятость, офис",
				intro:
					"В мои обязанности входили ведение сайтов компании, написание ежедневных новостей и общение с клиентами, а также контроль печатной продукции — от дизайна до распространения. Я также представлял компанию на деловых и государственных мероприятиях и помогал формировать её публичный образ."
			}
		],
		seeMoreLabel: (count) => `Показать ещё ${count}`,
		strengthsTitle: "Сильные стороны и навыки",
		strengthsParagraphs: [
			"Моя главная сильная сторона — решать сложные задачи через элегантные, хорошо продуманные решения и превращать их в ясные, рабочие интерфейсы. Никакой магии в этом нет: только опыт, насмотренность и дисциплинированный подход к дизайну.",
			"Мне часто говорят, что у меня очень точный глаз на детальную проработку интерфейсов, и я бы назвал это своей второй сильной стороной. Черновые вайрфреймы и ранние концепты могут и должны быть смелыми, но когда дело доходит до финального продукта, я люблю доводить всё до пикселя. Шучу, конечно, но в Figma у меня и правда обычно всё очень аккуратно."
		],
		recommendationsTitle: "Рекомендации",
		recommendationsLeadBeforeLink: "Ниже — несколько отзывов от коллег и клиентов, с которыми я работал в разные годы. Это взгляд со стороны на мою работу, стиль взаимодействия и вклад в разных ролях и проектах. Изначально они были опубликованы в ",
		recommendationsLeadLinkLabel: "LinkedIn",
		recommendationsLeadAfterLink: ".",
		recommendations: [
			{
				name: "Bulat Meshkov",
				href: "https://www.linkedin.com/in/bulatmeshkov/",
				favicon: "/favicons/exness.png",
				role: "Старший продуктовый дизайнер, Exness",
				avatar: "/avatars/avatar-review-16.jpg",
				text:
					"«Дмитрий по-настоящему болеет за пользовательский опыт и всегда отстаивает решения, где в центре внимания — потребности пользователя.»"
			},
			{
				name: "Aleksandr Kiselev",
				href: "https://www.linkedin.com/in/aleksandr-kiselev-41a228271",
				favicon: "/favicons/mayflower.ico",
				role: "Старший full-stack разработчик, Mayflower",
				avatar: "/avatars/avatar-review-17.jpg",
				text:
					"«Нам удавалось выпускать сложные и визуально сильные функции, находя идеальный баланс между качеством дизайна и реализацией.»"
			},
			{
				name: "Yurii Korotun",
				href: "https://www.linkedin.com/in/yurii-korotun/",
				favicon: "/favicons/gen.png",
				role: "Ведущий менеджер продукта, Gen",
				avatar: "/avatars/avatar-review-15.jpg",
				text:
					"«У него редкое внимание к деталям и глубокое понимание того, что нужно, чтобы интерфейс был одновременно функциональным и привлекательным.»"
			},
			{
				name: "Ron Ward",
				href: "https://www.linkedin.com/in/ron-ward-jr/",
				favicon: "/favicons/avast.ico",
				role: "Старший менеджер продукта, Avast Software",
				avatar: "/avatars/avatar-review-13.jpg",
				text:
					"«Дмитрий сохранял позитивный настрой, несмотря на множество сложностей. [...] Он всегда держал в фокусе потребности клиента и очень тонко относился к деталям.»"
			},
			{
				name: "Natalie Schinkova",
				href: "https://www.linkedin.com/in/natalie-schinkova/",
				favicon: "/favicons/avast.ico",
				role: "Менеджер продукта, Avast Software",
				avatar: "/avatars/avatar-review-12.jpg",
				text:
					"«Как бывший UX-исследователь, ставший PM, я особенно ценила Димин фокус на пользователе и его способность превращать выводы исследований в точные изменения в дизайне.»"
			},
			{
				name: "Victoria Usan",
				href: "https://www.linkedin.com/in/victoriausan/",
				favicon: "/favicons/avast.ico",
				role: "QA-инженер, Avast Software",
				avatar: "/avatars/avatar-review-14.jpg",
				text:
					"«Дима уделил много времени тому, чтобы помочь мне профессионально вырасти. [...] Работать с ним над каждым нашим проектом было настоящим удовольствием.»"
			},
			{
				name: "Anton Gilyov",
				href: "https://www.linkedin.com/in/gilyov/",
				favicon: "/favicons/avast.ico",
				role: "Старший frontend-разработчик, Avast Software",
				avatar: "/avatars/avatar-review-1.jpg",
				text:
					"«Это один из самых профессиональных и ответственных людей, которых я когда-либо встречал.»"
			},
			{
				name: "Jon Schubbe",
				href: "https://www.linkedin.com/in/jon-schubbe-327aa613/",
				favicon: "/favicons/avast.ico",
				role: "Старший продуктовый дизайнер, Avast Software",
				avatar: "/avatars/avatar-review-11.jpg",
				text:
					"«Одна из главных сильных сторон Димы в том, что он всегда доводит дело до конца.»"
			},
			{
				name: "Jan Marek",
				href: "https://www.linkedin.com/in/jan-marek-52453848/",
				favicon: "/favicons/avast.ico",
				role: "Старший продуктовый дизайнер, Avast Software",
				avatar: "/avatars/avatar-review-10.jpg",
				text:
					"«У него глубокое понимание принципов проектирования пользовательского опыта и интерфейсов.»"
			},
			{
				name: "Jiří Pojezný",
				href: "https://www.linkedin.com/in/ji%C5%99%C3%AD-pojezn%C3%BD-6a322765/",
				favicon: "/favicons/avast.ico",
				role: "Старший frontend-разработчик, Avast Software",
				text:
					"«Дима очень дружелюбный и отзывчивый. Он всегда рядом, когда нужен коллегам.»"
			},
			{
				name: "Ilja Panić",
				href: "https://www.linkedin.com/in/iljapanic/",
				favicon: "/favicons/avast.ico",
				role: "Старший продуктовый дизайнер, Avast Software",
				avatar: "/avatars/avatar-review-9.jpg",
				text:
					"«Это один из самых надёжных и талантливых дизайнеров, с которыми я работал за последние 10 лет.»"
			},
			{
				name: "Elena Ukolova",
				href: "https://www.linkedin.com/in/elenaukolova/",
				favicon: "/favicons/avast.ico",
				role: "Старший продуктовый дизайнер, Avast Software",
				avatar: "/avatars/avatar-review-8.jpg",
				text:
					"«Если у меня возникал вопрос по Figma или дизайн-системе, именно к нему всегда можно было прийти за самым глубоким ответом.»"
			},
			{
				name: "Alysa Yamada",
				href: "https://www.linkedin.com/in/alyyamada/",
				favicon: "/favicons/avast.ico",
				role: "UX-райтер, Avast Software",
				avatar: "/avatars/avatar-review-7.jpg",
				text:
					"«Его способность структурировать идеи и упрощать процессы для всех — это почти магия.»"
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
					"«Дима оперативен и надёжен, всегда быстро отвечает и выдаёт результаты высочайшего качества. Его внимание к деталям невозможно переоценить.»"
			},
			{
				name: "Andrey Perfilev",
				href: "https://www.linkedin.com/in/perfilev/",
				favicon: "/favicons/nitroseller.png",
				role: "CEO, Nitroseller",
				avatar: "/avatars/avatar-review-6.jpg",
				text:
					"«Дмитрий — очень сильный продуктовый дизайнер. Смело рекомендую!»"
			},
			{
				name: "Vladimir Rybas",
				href: "https://www.linkedin.com/in/vrybas/",
				favicon: "/favicons/typeform.ico",
				role: "Ведущий разработчик, Typeform",
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
			"Больше всего пользы я приношу как самостоятельный специалист, но у меня есть опыт ведения креативных инициатив в рамках бизнес-целей и плотной работы с небольшими сфокусированными командами. Я часто помогаю новым сотрудникам быстрее освоиться, а также беру на себя наставничество для младших дизайнеров и провожу их через дизайн-процессы.",
		hobbiesTitle: "Увлечения",
		hobbiesParagraphs: [
			"Моё главное увлечение — фотография. Я занимаюсь ею уже давно, ещё со времён, когда плёночные камеры были обычным делом. В какой-то момент я настолько уверенно почувствовал себя в этом деле, что начал брать подработки и даже снимал для компаний вроде Omsk Carbon Group людей и пространства.",
			"Ещё одна важная часть моей жизни — велосипед. Нет ничего лучше, чем сесть в седло, открывать новые места и знакомиться с людьми по пути. И это очень естественно сочетается с моей фотографией.",
			"И да, я семьянин, так что много времени провожу с женой Ольгой и нашими двумя сыновьями — Борисом и Глебом."
		],
		contactTitle: "Контакты",
		contactLeadBeforeCity: "Я живу в 🇨🇾 ",
		contactCity: "Лимасоле",
		contactLeadAfterCity: " и всегда рад новым знакомствам. Если хочешь связаться, лучше всего написать мне в ",
		contactLinkLabel: "Telegram",
		contactLeadAfterLink: "."
	}
};

export const getAboutPageCopy = (locale: Locale) => aboutPageCopy[locale];
