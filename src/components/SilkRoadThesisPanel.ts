import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
import { t } from '@/services/i18n';

interface ThesisSection {
  label: string;
  title: string;
  body: string;
  link?: { text: string; url: string };
}

const DEFAULT_SECTIONS: ThesisSection[] = [
  {
    label: 'CORE THESIS',
    title: 'The Big Mouth',
    body: 'The Middle East functions as a single consumption machine across 34 countries. It imports construction, medtech, edtech, media equipment, food, military hardware, and pharma — but produces very little and innovates even less locally.',
  },
  {
    label: 'THE GAP',
    title: 'Nobody Occupies This Bridge',
    body: 'China has massive manufacturing capacity. The Arab world is a significant consumer market. But the gap between them is enormous: language barriers, trust dynamics, halal requirements, relationship-first buying culture, and mismatched payment norms.',
  },
  {
    label: 'POSITIONING',
    title: 'Market Maker — Not Agent, Not Consultant',
    body: 'We create transactions between Arab importers and Chinese suppliers. We protect our position through exclusive agreements and technical facilitation. One deal proves everything.',
  },
  {
    label: 'NEXT STEP',
    title: 'Get In Position',
    body: 'This dashboard is a living proof of concept. Every data point is real. If you are an Arab importer, a Chinese manufacturer, or an investor building bridges — the conversation starts here.',
    link: { text: 'Visit silkroadleo.com →', url: 'https://silkroadleo.com' },
  },
];

export class SilkRoadThesisPanel extends Panel {
  private sections: ThesisSection[];
  private currentIndex = 0;
  private autoRotateTimer: ReturnType<typeof setInterval> | null = null;

  constructor(sections: ThesisSection[] = DEFAULT_SECTIONS) {
    super({
      id: 'silkroad-thesis',
      title: t('silkroad.welcomeTitle') || 'The Bridge Nobody Occupies',
      closable: false,
      className: 'silkroad-thesis-panel',
      trackActivity: false,
    });
    this.sections = sections;
    this.render();
    this.startAutoRotate();
  }

  private render(): void {
    const section = this.sections[this.currentIndex] ?? this.sections[0];
    if (!section) return;
    const countLabel = `${this.currentIndex + 1}/${this.sections.length}`;

    const linkHtml = section.link
      ? `<a href="${escapeHtml(section.link.url)}" target="_blank" rel="noopener noreferrer" class="sr-thesis-link">${escapeHtml(section.link.text)}</a>`
      : '';

    const html = `
<div class="sr-thesis-card">
  <div class="sr-thesis-header">
    <span class="sr-thesis-label">${escapeHtml(section.label)}</span>
    <span class="sr-thesis-count">${escapeHtml(countLabel)}</span>
  </div>
  <h3 class="sr-thesis-title">${escapeHtml(section.title)}</h3>
  <p class="sr-thesis-body">${escapeHtml(section.body)}</p>
  ${linkHtml}
  <div class="sr-thesis-nav">
    ${this.sections.map((_, i) => `
      <button class="sr-thesis-dot${i === this.currentIndex ? ' active' : ''}" data-index="${i}" aria-label="Section ${i + 1}"></button>
    `).join('')}
  </div>
</div>`;

    this.content.innerHTML = html;

    this.content.querySelectorAll('.sr-thesis-dot').forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const idx = Number((e.currentTarget as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) {
          this.currentIndex = idx;
          this.render();
        }
      });
    });
  }

  private startAutoRotate(): void {
    this.autoRotateTimer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sections.length;
      this.render();
    }, 15000);
  }

  public destroy(): void {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
    super.destroy();
  }
}
