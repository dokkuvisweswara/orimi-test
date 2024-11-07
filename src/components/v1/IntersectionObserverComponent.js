'use client'
import { useEffect, useRef, useState } from 'react';
import SkeletonCard from './skeletonCard';

export default function IntersectionObserverComponent({ children }) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setTimeout(() => {
						setIsVisible(true);
						observer.unobserve(entry.target);

					}, 3000)
				}
			},
			{ threshold: 0.1 } // Adjust threshold as needed
		);
		let refCurrent = ref.current;
		if (refCurrent) {
			observer.observe(refCurrent);
		}

		return () => {
			if (refCurrent) {
				observer.unobserve(refCurrent);
			}
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <div ref={ref}>{isVisible ? children : <SkeletonCard/>
	}</div>;
}
