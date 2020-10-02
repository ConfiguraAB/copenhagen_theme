import React, { useState, useEffect, useCallback, useRef } from "react";
import fetch from "unfetch";

const LOCALES_URL = "/api/v2/locales.json";

interface Locale {
	url: string;
	name: string;
	default: boolean;
	rtl: boolean;
	native_name: string;
	presentation_name: string;
	locale: string;
}

function getPageLang() {
	const pathname = window.location.pathname;
	return pathname.split("/")[2];
}

function getLangPath(lang: string) {
	const pathArr = window.location.pathname.split("/");
	pathArr.splice(2, 1, lang.toLowerCase());
	return pathArr.join("/");
}

export const TranslationsDropdown: React.FC = () => {
	const [locales, setLocales] = useState<Locale[]>([]);
	const [currLocale, setCurrLocale] = useState<Locale>();
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const optionsRef = useRef<HTMLUListElement>(null);

	const openOptions = () => setShowOptions(true);

	useEffect(() => {
		fetch(LOCALES_URL)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(response.statusText);
				}
			})
			.then((json) => {
				const jsonLocales = json.locales;
				const currLang = getPageLang();

				setLocales(jsonLocales);
				setCurrLocale(
					jsonLocales.filter(
						(locale: Locale) =>
							locale.locale.toUpperCase() ===
							currLang.toUpperCase()
					)[0]
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleMouseOut = () => setShowOptions(false);

	useEffect(() => {
		const element = optionsRef.current;
		element?.addEventListener("mouseleave", handleMouseOut);

		return () => {
			element?.removeEventListener("mouseleave", handleMouseOut);
		};
	}, [showOptions]);

	return (
		<div className="language-container">
			<div className="language-dropdown" onMouseOver={openOptions}>
				{currLocale?.name}
			</div>
			{showOptions && (
				<ul className="language-ul" ref={optionsRef}>
					{locales.map((locale) => (
						<LangOption locale={locale} />
					))}
				</ul>
			)}
		</div>
	);
};

interface LangOptionProps {
	locale: Locale;
}

const LangOption: React.FC<LangOptionProps> = ({ locale }) => {
	return (
		<li className="language-li">
			<a href={getLangPath(locale.locale)}>{locale.name}</a>
		</li>
	);
};
