"use client"
import React, { useState, useEffect } from 'react';

export default function FaqSection() {
  const [dataset, setDataset] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch terms of use content
    fetch('https://static-templates.web.app/orimedia/faq/faq-mn.html')
      .then((res) => res.text())
      .then((result) => setDataset(result));
  }, []);

  useEffect(() => {
    const questions: any = document.querySelectorAll('.question');

    questions.forEach((question:any) => {
      question.addEventListener('click', () => {
        const answer: any = question.nextElementSibling;
        const arrows: any = document.querySelectorAll('.arrow');

        arrows.forEach((arrow: any) => (arrow.style.transform = 'rotate(0deg)'));
        questions.forEach((q:any) => {
          const a: any = q.nextElementSibling;
          if (q !== question) {
            a.style.display = 'none';
            q.classList.remove('open');
          }
        });

        answer.style.display =
          answer.style.display === 'block' ? 'none' : 'block';
        question.querySelector('.arrow').style.transform =
          answer.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0deg)';
        question.classList.toggle('open');

        if (answer.style.display === 'block') {
          const offsetTop = question.offsetTop;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  }, [dataset]); // Run the effect whenever dataset changes

  return (
    <div>
      <div className="text-center">
        <u className="text-secondaryItemColor">Help/FAQs</u>
      </div>
      <div dangerouslySetInnerHTML={{ __html: dataset }} />
    </div>
  );
}
