const exerciseForm = document.getElementById('exerciseForm');
const exerciseTableBody = document.getElementById('exerciseTableBody');
const exerciseStats = document.getElementById('exerciseStats');
const readinessForm = document.getElementById('readinessForm');
const readinessResult = document.getElementById('readinessResult');
const readinessSummary = document.getElementById('readinessSummary');
const mbtiForm = document.getElementById('mbtiForm');
const mbtiQuestionsList = document.getElementById('mbtiQuestions');
const mbtiResult = document.getElementById('mbtiResult');
const copyWorkout = document.getElementById('copyWorkout');
const copyPlan = document.getElementById('copyPlan');

const exercises = [];

const mbtiQuestionBank = [
  {
    dimension: 'EI',
    question: 'At the start of a training session you usually…',
    options: [
      { value: 'E', label: 'Gain energy from training with others and loud music' },
      { value: 'I', label: 'Prefer a quieter setup to get into flow solo' },
    ],
  },
  {
    dimension: 'EI',
    question: 'When planning accountability you prefer…',
    options: [
      { value: 'E', label: 'Partner workouts or community challenges' },
      { value: 'I', label: 'Personal tracking and reflective journaling' },
    ],
  },
  {
    dimension: 'SN',
    question: 'Progress feels real when…',
    options: [
      { value: 'S', label: 'You can see concrete metrics and tangible results' },
      { value: 'N', label: 'You connect training to a big-picture vision' },
    ],
  },
  {
    dimension: 'SN',
    question: 'Workout instructions should be…',
    options: [
      { value: 'S', label: 'Clear, step-by-step, and precise' },
      { value: 'N', label: 'Flexible templates you can adapt intuitively' },
    ],
  },
  {
    dimension: 'TF',
    question: 'When workouts get tough you rely on…',
    options: [
      { value: 'T', label: 'Objective data and logical pacing' },
      { value: 'F', label: 'Values, encouragement, or how training helps others' },
    ],
  },
  {
    dimension: 'TF',
    question: 'Choosing a program depends on…',
    options: [
      { value: 'T', label: 'Evidence, structure, and proven efficiency' },
      { value: 'F', label: 'Alignment with your lifestyle and relationships' },
    ],
  },
  {
    dimension: 'JP',
    question: 'Your training calendar is…',
    options: [
      { value: 'J', label: 'Scheduled in advance with little variation' },
      { value: 'P', label: 'Flexible so you can train when inspiration hits' },
    ],
  },
  {
    dimension: 'JP',
    question: 'Tracking tools should…',
    options: [
      { value: 'J', label: 'Keep you accountable with structure and deadlines' },
      { value: 'P', label: 'Allow experimentation and spontaneous sessions' },
    ],
  },
];

const mbtiPlans = {
  ESTJ: {
    focus: 'Strength periodization with progressive overload and precise KPIs.',
    tactics: [
      'Use weekly spreadsheets with volume and intensity targets.',
      'Anchor workouts around compound lifts and measurable benchmarks.',
      'Automate reminders for nutrition and sleep targets.',
    ],
  },
  ESTP: {
    focus: 'Hybrid strength & conditioning with competitive bursts.',
    tactics: [
      'Rotate between strength complexes and short, intense conditioning.',
      'Join group challenges or leaderboards to keep intensity high.',
      'Leverage wearable data for real-time performance feedback.',
    ],
  },
  ESFJ: {
    focus: 'Community-driven training with rhythm and accountability.',
    tactics: [
      'Schedule weekly classes or small-group sessions.',
      'Pair mobility cooldowns with gratitude journaling.',
      'Share milestones with friends or a coach to stay motivated.',
    ],
  },
  ESFP: {
    focus: 'Dynamic workouts centered around fun, variety, and music.',
    tactics: [
      'Mix dance-based cardio, plyometrics, and outdoor sessions.',
      'Curate energizing playlists and rotate movement challenges.',
      'Track readiness loosely—prioritize enjoyment and consistency.',
    ],
  },
  ENTJ: {
    focus: 'Goal-crushing macrocycles with strategic deloads.',
    tactics: [
      'Map 12-week blocks with milestones and review points.',
      'Delegate or automate meal prep to stay on mission.',
      'Use performance dashboards to measure ROI of your effort.',
    ],
  },
  ENTP: {
    focus: 'Exploratory training with skill sprints and novelty.',
    tactics: [
      'Plan 4-week experiments (e.g., calisthenics month, kettlebell month).',
      'Keep a whiteboard of new movement skills to learn.',
      'Use readiness markers to determine when to pivot focus.',
    ],
  },
  ENFJ: {
    focus: 'Purpose-driven training tied to community impact.',
    tactics: [
      'Lead a friend or family member through workouts once per week.',
      'Link goals to how improved health helps you show up for others.',
      'Blend breathwork and reflection into recovery days.',
    ],
  },
  ENFP: {
    focus: 'Creative cross-training with space for spontaneity.',
    tactics: [
      'Keep a menu of go-to workouts and choose what excites you.',
      'Use color-coded habit trackers instead of strict schedules.',
      'Share stories or content about your journey for inspiration.',
    ],
  },
  ISTJ: {
    focus: 'Methodical strength routines with incremental progress.',
    tactics: [
      'Follow structured programs with clear progressive steps.',
      'Monitor sleep, nutrition, and recovery metrics daily.',
      'Review logs weekly to confirm improvements.',
    ],
  },
  ISTP: {
    focus: 'Skill-based training emphasizing efficiency and mastery.',
    tactics: [
      'Alternate strength days with skill practice (e.g., gymnastics, olympic lifts).',
      'Use wearable data to optimize rest and pace.',
      'Perform post-session notes to iterate technique.',
    ],
  },
  ISFJ: {
    focus: 'Supportive routines that value steadiness and service.',
    tactics: [
      'Blend low-impact cardio with resistance work for balance.',
      'Prep meals for yourself and someone you care about.',
      'Use gentle reminders rather than rigid alarms.',
    ],
  },
  ISFP: {
    focus: 'Flow-state movement emphasizing expression and recovery.',
    tactics: [
      'Alternate between mindful strength training and outdoor adventures.',
      'Curate sensory-rich environments (lighting, music, aroma).',
      'Capture progress through photos or creative journaling.',
    ],
  },
  INTJ: {
    focus: 'Systems thinking with long-term adaptation goals.',
    tactics: [
      'Build dashboards for trends in HRV, volume, and recovery.',
      'Break large goals into quarterly plans with retrospectives.',
      'Automate readiness logging using connected devices when possible.',
    ],
  },
  INTP: {
    focus: 'Experiment-driven training with data deep-dives.',
    tactics: [
      'Run mini self-experiments comparing protocols (e.g., tempo vs. speed).',
      'Log detailed session notes and annotate insights.',
      'Schedule periodic movement workshops to learn from experts.',
    ],
  },
  INFJ: {
    focus: 'Meaningful training anchored to personal mission.',
    tactics: [
      'Create rituals that connect workouts to long-term purpose.',
      'Use heart-rate zones and breathwork to stay mindful.',
      'Pair solo sessions with occasional partner training for balance.',
    ],
  },
  INFP: {
    focus: 'Values-aligned fitness with gentle structure.',
    tactics: [
      'Craft playlists or vision boards that embody how you want to feel.',
      'Alternate structured weeks with intuitive movement weeks.',
      'Track energy and mood alongside physical stats.',
    ],
  },
};

function renderExerciseRow(entry, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${entry.exercise}</td>
    <td>${entry.sets}</td>
    <td>${entry.reps}</td>
    <td>${entry.rest}s</td>
    <td>${entry.rpe}</td>
    <td>${entry.tut}s</td>
    <td>${entry.totalTension.toFixed(1)}s</td>
    <td><button type="button" class="btn btn--ghost" data-index="${index}">Remove</button></td>
  `;
  return row;
}

function updateExercisesView() {
  exerciseTableBody.innerHTML = '';
  exercises.forEach((entry, index) => {
    const row = renderExerciseRow(entry, index);
    exerciseTableBody.appendChild(row);
  });

  const stats = calculateExerciseStats();
  renderExerciseStats(stats);
}

function calculateExerciseStats() {
  if (!exercises.length) {
    return null;
  }

  const totals = exercises.reduce(
    (acc, item) => {
      acc.totalSets += item.sets;
      acc.totalReps += item.sets * item.reps;
      acc.totalRest += item.rest * (item.sets - 1);
      acc.totalRpe += item.rpe;
      acc.totalTension += item.totalTension;
      return acc;
    },
    { totalSets: 0, totalReps: 0, totalRest: 0, totalRpe: 0, totalTension: 0 }
  );

  return {
    totalSets: totals.totalSets,
    totalReps: totals.totalReps,
    averageRpe: totals.totalRpe / exercises.length,
    totalRest: totals.totalRest,
    totalTimeUnderTension: totals.totalTension,
  };
}

function renderExerciseStats(stats) {
  if (!stats) {
    exerciseStats.innerHTML =
      '<p class="muted">Log an exercise to see session analytics.</p>';
    return;
  }

  exerciseStats.innerHTML = `
    <div class="stats__item">
      <span>Total Sets</span>
      <strong>${stats.totalSets}</strong>
    </div>
    <div class="stats__item">
      <span>Total Reps</span>
      <strong>${stats.totalReps}</strong>
    </div>
    <div class="stats__item">
      <span>Average RPE</span>
      <strong>${stats.averageRpe.toFixed(1)}</strong>
    </div>
    <div class="stats__item">
      <span>Total Rest Time</span>
      <strong>${Math.round(stats.totalRest)}s</strong>
    </div>
    <div class="stats__item">
      <span>Time Under Tension</span>
      <strong>${stats.totalTimeUnderTension.toFixed(1)}s</strong>
    </div>
  `;
}

function handleExerciseSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const entry = Object.fromEntries(formData.entries());

  const sets = Number(entry.sets);
  const reps = Number(entry.reps);
  const rest = Number(entry.rest);
  const rpe = Number(entry.rpe);
  const tut = Number(entry.tut);

  const totalTension = sets * reps * tut;

  exercises.push({
    exercise: entry.exercise.trim(),
    sets,
    reps,
    rest,
    rpe,
    tut,
    totalTension,
  });

  event.target.reset();
  updateExercisesView();
}

function handleExerciseClick(event) {
  const button = event.target.closest('button[data-index]');
  if (!button) return;

  const index = Number(button.dataset.index);
  exercises.splice(index, 1);
  updateExercisesView();
}

function evaluateReadinessMetrics(metrics) {
  const readinessScore = [
    metrics.heartRate <= 65 ? 1 : metrics.heartRate <= 75 ? 0 : -1,
    metrics.systolic < 130 && metrics.diastolic < 85 ? 1 : -1,
    metrics.hrv >= 70 ? 1 : metrics.hrv >= 50 ? 0 : -1,
    metrics.sleep >= 7 ? 1 : metrics.sleep >= 6 ? 0 : -1,
    metrics.soreness <= 4 ? 1 : metrics.soreness <= 6 ? 0 : -1,
  ].reduce((acc, curr) => acc + curr, 0);

  let status;
  let recommendation;

  if (readinessScore >= 3) {
    status = 'Ready to Push';
    recommendation =
      'Vitals and recovery look solid. Consider a higher-intensity or volume session today.';
  } else if (readinessScore >= 1) {
    status = 'Maintain & Monitor';
    recommendation =
      'Proceed with your planned workout but watch form, hydration, and breathing cues.';
  } else {
    status = 'Prioritize Recovery';
    recommendation =
      'Consider active recovery, mobility, or additional rest before your next demanding session.';
  }

  return { readinessScore, status, recommendation };
}

function handleReadinessSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const metrics = {
    heartRate: Number(formData.get('heartRate')),
    systolic: Number(formData.get('systolic')),
    diastolic: Number(formData.get('diastolic')),
    hrv: Number(formData.get('hrv')),
    sleep: Number(formData.get('sleep')),
    soreness: Number(formData.get('soreness')),
  };

  const evaluation = evaluateReadinessMetrics(metrics);
  renderReadinessResult(metrics, evaluation);
  updateReadinessSummary(metrics, evaluation);
}

function renderReadinessResult(metrics, evaluation) {
  readinessResult.innerHTML = `
    <h3>${evaluation.status}</h3>
    <p>${evaluation.recommendation}</p>
    <ul>
      <li><strong>Heart Rate:</strong> ${metrics.heartRate} bpm</li>
      <li><strong>Blood Pressure:</strong> ${metrics.systolic}/${metrics.diastolic} mmHg</li>
      <li><strong>HRV:</strong> ${metrics.hrv} ms</li>
      <li><strong>Sleep:</strong> ${metrics.sleep} hrs</li>
      <li><strong>Soreness:</strong> ${metrics.soreness}/10</li>
    </ul>
  `;
}

function updateReadinessSummary(metrics, evaluation) {
  readinessSummary.innerHTML = `
    <h3>${evaluation.status}</h3>
    <p>${evaluation.recommendation}</p>
    <div class="summary-grid">
      <span>HR: ${metrics.heartRate} bpm</span>
      <span>BP: ${metrics.systolic}/${metrics.diastolic}</span>
      <span>HRV: ${metrics.hrv} ms</span>
      <span>Sleep: ${metrics.sleep} hrs</span>
    </div>
  `;
}

function renderMbtiQuestions() {
  const template = document.getElementById('questionTemplate');
  mbtiQuestionBank.forEach((item, index) => {
    const clone = template.content.firstElementChild.cloneNode(true);
    const legend = clone.querySelector('legend');
    const optionsContainer = clone.querySelector('.question-options');
    const name = `${item.dimension}-${index}`;

    legend.textContent = item.question;

    item.options.forEach((option, optIndex) => {
      const id = `${name}-${optIndex}`;
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.innerHTML = `
        <input type="radio" name="${name}" id="${id}" value="${option.value}" required />
        <span>${option.label}</span>
      `;
      optionsContainer.appendChild(label);
    });

    mbtiQuestionsList.appendChild(clone);
  });
}

function handleMbtiSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const tallies = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const value of formData.values()) {
    tallies[value] += 1;
  }

  const type = `${tallies.E >= tallies.I ? 'E' : 'I'}${tallies.S >= tallies.N ? 'S' : 'N'}${
    tallies.T >= tallies.F ? 'T' : 'F'
  }${tallies.J >= tallies.P ? 'J' : 'P'}`;

  const plan = mbtiPlans[type];
  if (!plan) {
    mbtiResult.innerHTML = `
      <h3>${type}</h3>
      <p>We are still designing a training plan for this profile. Try selecting again.</p>
    `;
    return;
  }

  mbtiResult.innerHTML = `
    <h3>${type} Training Blueprint</h3>
    <p>${plan.focus}</p>
    <ul>
      ${plan.tactics.map((tip) => `<li>${tip}</li>`).join('')}
    </ul>
  `;
}

function toClipboard(text, button) {
  if (!navigator.clipboard) {
    button.textContent = 'Clipboard unavailable';
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      const original = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = original;
      }, 2000);
    })
    .catch(() => {
      button.textContent = 'Copy failed';
    });
}

function generateWorkoutSummary() {
  if (!exercises.length) {
    return 'No exercises logged yet.';
  }

  const lines = exercises.map((item) => {
    return `${item.exercise}: ${item.sets}x${item.reps} @ RPE ${item.rpe}, Rest ${item.rest}s, TUT ${item.tut}s`;
  });

  const stats = calculateExerciseStats();
  lines.push(
    `Totals -> Sets: ${stats.totalSets}, Reps: ${stats.totalReps}, Avg RPE: ${stats.averageRpe.toFixed(
      1
    )}, Rest: ${Math.round(stats.totalRest)}s, TUT: ${stats.totalTimeUnderTension.toFixed(1)}s`
  );

  return lines.join('\n');
}

function generatePlanSummary() {
  const readinessText = readinessResult.textContent.trim() || 'Readiness not evaluated.';
  const mbtiText = mbtiResult.textContent.trim() || 'MBTI plan not generated yet.';
  return `${readinessText}\n\n${mbtiText}`;
}

exerciseForm.addEventListener('submit', handleExerciseSubmit);
exerciseTableBody.addEventListener('click', handleExerciseClick);
readinessForm.addEventListener('submit', handleReadinessSubmit);
mbtiForm.addEventListener('submit', handleMbtiSubmit);
copyWorkout.addEventListener('click', () => toClipboard(generateWorkoutSummary(), copyWorkout));
copyPlan.addEventListener('click', () => toClipboard(generatePlanSummary(), copyPlan));

renderMbtiQuestions();
renderExerciseStats(null);

readinessSummary.innerHTML = `
  <h3>Readiness Snapshot</h3>
  <p>Complete the checklist to see if you should push, maintain, or recover.</p>
  <div class="summary-grid">
    <span>HR: --</span>
    <span>BP: --</span>
    <span>HRV: --</span>
    <span>Sleep: --</span>
  </div>
`;
