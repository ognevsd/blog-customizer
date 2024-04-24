// пример хука для закрытия внеобласти и по нажатию на esc

import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isOpen) return; // останавливаем действие эффекта, если закрыто

		const handleClickOutsideForm = (event: MouseEvent) => {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);

			if (isOutsideClick) {
				onClose();
			}
		};
		const handleEscClick = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscClick);
		document.addEventListener('mousedown', handleClickOutsideForm);
		return () => {
			document.addEventListener('keydown', handleEscClick);
			document.removeEventListener('mousedown', handleClickOutsideForm);
		};

		// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
	}, [isOpen, onClose, rootRef]);
}
