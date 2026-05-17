import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
import { getChangeClass } from '@/utils';
import { fetchMenaChinaStats, getFallbackMenaChinaStats, type TradeStat } from '@/services/mena-china-data';
import { t } from '@/services/i18n';

export class ChinaTradeDataPanel extends Panel {
  constructor() {
    super({ id: 'china-trade', title: t('panels.chinaTrade') || 'China Export & Factory Data', infoTooltip: 'Real-time commodity prices, exchange rates, and key China macro signals' });
  }

  public async fetchData(): Promise<void> {
    if (!this.element?.isConnected) return;
    this.showLoading('Loading trade data...');

    const liveStats = await fetchMenaChinaStats();
    // Merge live data on top of fallback so we always show all metrics
    const fallback = getFallbackMenaChinaStats();
    const merged = fallback.map((f) => {
      const live = liveStats.find((l) => l.label === f.label);
      return live ?? f;
    });
    // Append any extra live stats not in fallback
    const extra = liveStats.filter((l) => !fallback.some((f) => f.label === l.label));
    this.renderStats([...merged, ...extra]);
  }

  private renderStats(stats: TradeStat[]): void {
    const rows = stats.map((s) => {
      const changeClass = s.change ? getChangeClass(parseFloat(s.change)) : 'neutral';
      const changeHtml = s.change
        ? `<span class="market-change ${changeClass}">${escapeHtml(s.change)}</span>`
        : '';
      return `
        <div class="market-item">
          <div class="market-info">
            <span class="market-name">${escapeHtml(s.label)}</span>
            <span class="market-symbol" style="font-size:10px;opacity:.6">${escapeHtml(s.source)}</span>
          </div>
          <div class="market-data">
            <span class="market-price">${escapeHtml(s.value)}</span>
            ${changeHtml}
          </div>
        </div>
      `;
    }).join('');

    const html = `
      <div class="gulf-section">
        <div class="gulf-section-title">Key Prices & Rates</div>
        ${rows}
      </div>
      <div style="margin-top:12px;font-size:11px;opacity:.55;padding:0 8px">
        China PMI (Apr): 49.0  ·  New Export Orders: 46.3  ·  Source: NBS / Caixin
      </div>
    `;
    this.setContent(html);
  }
}
