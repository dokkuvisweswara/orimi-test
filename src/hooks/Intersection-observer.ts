export const HookIntersectionObserver = (entryTraget: any, animationStyleClass: any) => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationStyleClass);
            } else {
                entry.target.classList.remove(animationStyleClass);

            }
        });
    });
    
    observer.observe(entryTraget);

    return observer
}
