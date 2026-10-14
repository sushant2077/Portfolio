/* Sushant Portfolio — dual-mode sections.
   Add <script src="mode-enhancements.js" defer></script> immediately before </body>,
   after the original inline portfolio script. No changes to Netlify Forms. */
(() => {
  'use strict';
  const work = document.querySelector('#work');
  const skills = document.querySelector('#skills');
  if (!work || !skills) return;

  const workLabel = work.querySelector('.section-head .section-label');
  const workTitle = work.querySelector('.section-head h2');
  const workDesc = work.querySelector('.section-head .desc');
  const workGrid = work.querySelector('.project-grid');
  const skillTitle = skills.querySelector('.section-head h2');
  const skillDesc = skills.querySelector('.section-head .desc');
  const skillGrid = skills.querySelector('.skills-grid');
  const contactTitle = document.querySelector('#contact h2');
  const contactDesc = document.querySelector('#contact > p');

  // Keep the ORIGINAL cards as DOM nodes: this preserves their existing modal handlers.
  const techCards = [...workGrid.children];
  const techSkills = skillGrid.innerHTML;
  const originalContactTitle = contactTitle?.innerHTML;
  const originalContactDesc = contactDesc?.innerHTML;

  const operationsCards = [
    {
      eyebrow: 'MERIVALE · COOGEE PAVILION', type: 'VENUE OPERATIONS', title: 'Leading through high-volume service',
      description: 'Supported busy venue operations with team coordination, practical troubleshooting, service continuity and clear communication during demanding shifts.',
      tags: ['Venue Operations', 'Team Leadership', 'Problem Solving', 'Customer Service']
    },
    {
      eyebrow: 'CELLAR · STOCK & SERVICE', type: 'OPERATIONAL DELIVERY', title: 'Keeping the operation ready',
      description: 'Focused on stock readiness, handovers, timely responses and smooth coordination with the wider hospitality team.',
      tags: ['Stock Readiness', 'Teamwork', 'Communication', 'Hospitality']
    },
    {
      eyebrow: 'VISION MARTIAL ARTS ACADEMY', type: 'CO-FOUNDER & MANAGER', title: 'Managing people and daily operations',
      description: 'Helped manage enquiries, customer experience, community engagement and day-to-day activities while contributing to digital promotion.',
      tags: ['Management', 'Customer Relations', 'Operations', 'Leadership']
    },
    {
      eyebrow: 'SIHE · CAMPUS REPRESENTATION', type: 'STUDENT LEADERSHIP', title: 'Representing people, building connections',
      description: 'Contributed to student representation, feedback, events and engagement as a student representative and brand ambassador.',
      tags: ['Stakeholder Management', 'Communication', 'Team Building', 'Leadership']
    }
  ];
  const operationsGrid = document.createDocumentFragment();
  operationsCards.forEach((card, i) => {
    const article = document.createElement('article');
    article.className = 'project ' + (i === 0 ? 'large' : i === 1 ? 'small' : 'half');
    article.style.setProperty('--p-accent', ['#ffb278', '#ff9d73', '#ff7b8d', '#ffd56a'][i]);
    // Data is locally defined and escaped before entering markup.
    const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    article.innerHTML = `
      <div class="project-meta"><span>${escape(card.eyebrow)}</span><span>${escape(card.type)}</span></div>
      <span class="project-index">${String(i + 1).padStart(2, '0')}</span>
      <h3>${escape(card.title)}</h3>
      <p>${escape(card.description)}</p>
      <div class="project-bottom"><div class="tags">${card.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div></div>`;
    operationsGrid.appendChild(article);
  });
  const opsCards = [...operationsGrid.children];

  const opsSkillGroups = [
    ['Leadership & Management', ['Leadership', 'Team Leadership', 'Staff Supervision', 'Management Skills', 'Team Building']],
    ['Venue & Hospitality', ['Venue Operations', 'Operations', 'Hospitality', 'Bartending', 'Food and Beverage Service']],
    ['Customer & Communication', ['Customer Service', 'Communication Skills', 'Stakeholder Management', 'Cash Handling']],
    ['Problem Solving', ['Troubleshooting', 'Problem Solving', 'Critical Thinking']]
  ];
  const opsSkills = opsSkillGroups.map(([title, items], index) => `
    <article class="skill-col">
      <span class="n">${String(index + 1).padStart(2, '0')}</span><h3>${title}</h3>
      <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>`).join('');

  let currentMode = null;
  function updateMode() {
    const mode = document.documentElement.dataset.mode === 'ops' ? 'ops' : 'tech';
    if (mode === currentMode) return;
    currentMode = mode;
    if (mode === 'ops') {
      workLabel.textContent = '02 / PROFESSIONAL EXPERIENCE';
      workTitle.innerHTML = 'Experience built<br>on the floor.';
      workDesc.textContent = 'From fast-paced hospitality environments to daily operational responsibilities, my experience has shaped how I lead, communicate and deliver consistent service under pressure.';
      workGrid.replaceChildren(...opsCards);
      skillTitle.innerHTML = 'People first.<br>Operations ready.';
      skillDesc.textContent = 'Practical strengths developed through hospitality, customer-facing work and team responsibilities.';
      skillGrid.innerHTML = opsSkills;
      if (contactTitle) contactTitle.innerHTML = 'Need someone who can keep <em>service moving</em> and people connected?';
      if (contactDesc) contactDesc.textContent = 'Open to hospitality, food and beverage, venue operations and team leadership opportunities.';
    } else {
      workLabel.textContent = '02 / SELECTED ACADEMIC WORK';
      workTitle.innerHTML = 'Case files,<br>not filler.';
      workDesc.textContent = 'These are real projects and supervised academic labs from my Bachelor of Information Technology. Group work is labelled as group work; individual analysis is labelled individually.';
      workGrid.replaceChildren(...techCards);
      skillTitle.innerHTML = 'Technical depth.<br>Human range.';
      skillDesc.textContent = 'I’m early in my IT career, so I don’t pretend every tool is production-level expertise. These are the areas I have studied, practised in labs, or used in real work.';
      skillGrid.innerHTML = techSkills;
      if (contactTitle) contactTitle.innerHTML = originalContactTitle;
      if (contactDesc) contactDesc.innerHTML = originalContactDesc;
    }
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  // Existing mode-switch code runs on click first; this updates the other sections afterwards.
  document.addEventListener('click', event => {
    if (event.target.closest('.mode-switch button, #modeQuick')) updateMode();
  });
  updateMode();
})();
