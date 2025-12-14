/**
 * EfficientOption.tsx
 * Présente l'option la plus efficace dans le domaine de la productivité personnelle:
 * la planification par blocs de temps (Time Blocking).
 * - En-tête clair, description argumentée
 * - Comparaison avec alternatives
 * - Points forts illustrés (icônes)
 * - Appel à l'action
 * Styles: CSS Modules (palette blanc/bleu-gris, accents verts), responsive et accessible.
 */

import { CheckCircle2, Clock, BarChart3, Zap } from 'lucide-react'
import styles from './EfficientOption.module.css'

/** Icône décorative avec taille commune */
function IconWrap(props: { children: React.ReactNode; label?: string }) {
  const { children, label } = props
  return (
    <span aria-hidden={!label} role={label ? 'img' : undefined} title={label || undefined}>
      {children}
    </span>
  )
}

/** Section "L’option la plus efficace" (productivité: Time Blocking) */
export function EfficientOptionSection() {
  return (
    <section aria-labelledby="option-plus-efficace" className={styles.section}>
      {/* Header */}
      <header className={styles.header}>
        <h2 id="option-plus-efficace" className={styles.title}>
          L’option la plus efficace
        </h2>
        <p className={styles.lead}>
          Dans le domaine de la <strong>productivité personnelle</strong>, la <em>planification par blocs de temps</em> (Time Blocking)
          s’impose comme l’option la plus efficace pour exécuter des priorités sans multitâche.
        </p>
      </header>

      {/* Why it works */}
      <div className={styles.band} role="note" aria-label="Pourquoi c’est efficace">
        <p className={styles.small}>
          Le Time Blocking réserve à l’avance des plages dédiées aux tâches à forte valeur.
          Cela réduit les changements de contexte, améliore la clarté des priorités et crée un rythme soutenable.
          Résultat: moins de dispersion, plus d’avancement mesurable.
        </p>
        <div className={styles.sep} />
        <p className={styles.small}>
          Indicateurs courants observés: <span className={styles.kpi}>+20–30% de temps de focus</span> et
          <span> meilleure visibilité hebdomadaire</span> grâce à un calendrier structuré.
        </p>
      </div>

      {/* Comparison */}
      <h3 className="mt-4 text-base font-semibold">Comparaison avec d’autres approches</h3>
      <div className={styles.tableWrap} role="region" aria-label="Tableau comparatif">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Option</th>
              <th>Efficacité perçue</th>
              <th>Courbe d’apprentissage</th>
              <th>Idéal pour</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Planification par blocs de temps
                <span className={styles.badge} style={{ marginLeft: 8 }}>
                  <IconWrap>
                    <CheckCircle2 size={16} aria-hidden />
                  </IconWrap>
                  Recommandée
                </span>
              </td>
              <td>Très élevée (réduction du multitâche, priorités visibles)</td>
              <td>1–2 jours de mise en place</td>
              <td>Professionnels du savoir, gestion de semaine</td>
            </tr>
            <tr>
              <td>To-do list simple</td>
              <td>Moyenne (capture facile mais priorisation fluctuante)</td>
              <td>Immédiate</td>
              <td>Collecte de tâches, rappels rapides</td>
            </tr>
            <tr>
              <td>Pomodoro (25 min)</td>
              <td>Élevée (bon focus unitaire, planification globale limitée)</td>
              <td>Faible</td>
              <td>Exécutions unitaires, révisions, apprentissage</td>
            </tr>
            <tr>
              <td>Gestion par email</td>
              <td>Faible (réactive, favorise l’interruption)</td>
              <td>Immédiate</td>
              <td>Support client discontinu</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Highlights */}
      <h3 className="mt-4 text-base font-semibold">Points forts</h3>
      <div className={styles.highlights}>
        <article className={styles.card}>
          <h4 className={styles.cardTitle}>
            <IconWrap>
              <BarChart3 size={18} aria-hidden />
            </IconWrap>
            Priorisation claire
          </h4>
          <p className={styles.cardText}>
            Les blocs rendent visibles les tâches à forte valeur et protègent le temps stratégique.
          </p>
        </article>
        <article className={styles.card}>
          <h4 className={styles.cardTitle}>
            <IconWrap>
              <Clock size={18} aria-hidden />
            </IconWrap>
            Focus profond
          </h4>
          <p className={styles.cardText}>
            Moins de changements de contexte, plus de concentration mesurable par créneau.
          </p>
        </article>
        <article className={styles.card}>
          <h4 className={styles.cardTitle}>
            <IconWrap>
              <Zap size={18} aria-hidden />
            </IconWrap>
            Rythme durable
          </h4>
          <p className={styles.cardText}>
            Un agenda équilibré limite la surcharge et respecte les temps de récupération.
          </p>
        </article>
        <article className={styles.card}>
          <h4 className={styles.cardTitle}>
            <IconWrap>
              <CheckCircle2 size={18} aria-hidden />
            </IconWrap>
            Facile à auditer
          </h4>
          <p className={styles.cardText}>
            Vue hebdomadaire: ce qui était prévu vs. réalisé pour ajuster sans culpabiliser.
          </p>
        </article>
      </div>

      {/* CTA */}
      <div className={styles.ctaRow}>
        <a
          href="#"
          className={styles.ctaPrimary}
          aria-label="Adopter le Time Blocking"
        >
          Adopter le Time Blocking
        </a>
        <a
          href="#"
          className={styles.ctaSecondary}
          aria-label="En savoir plus sur le Time Blocking"
        >
          En savoir plus
        </a>
        <span className={styles.small} aria-live="polite">
          Astuce: commencez par bloquer 2×45 min/jour pour vos priorités.
        </span>
      </div>
    </section>
  )
}

export default EfficientOptionSection
