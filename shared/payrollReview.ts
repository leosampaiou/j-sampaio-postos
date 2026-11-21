export const payrollAdjustmentStatuses = [
  "nao_elegivel",
  "aguardando_analise",
  "aguardando_autorizacao",
  "aprovado",
  "rejeitado",
  "encaminhado_folha",
  "processado",
] as const;

export type PayrollAdjustmentStatus = typeof payrollAdjustmentStatuses[number];

export const payrollAdjustmentInitialStatuses = ["nao_elegivel", "aguardando_analise"] as const;

export type PayrollAdjustmentInitialStatus = typeof payrollAdjustmentInitialStatuses[number];

export const payrollAdjustmentTransitions: Record<PayrollAdjustmentStatus, readonly PayrollAdjustmentStatus[]> = {
  nao_elegivel: ["nao_elegivel"],
  aguardando_analise: ["aguardando_analise", "aguardando_autorizacao", "nao_elegivel", "rejeitado"],
  aguardando_autorizacao: ["aguardando_autorizacao", "aprovado", "nao_elegivel", "rejeitado"],
  aprovado: ["aprovado", "encaminhado_folha", "rejeitado"],
  rejeitado: ["rejeitado"],
  encaminhado_folha: ["encaminhado_folha", "processado"],
  processado: ["processado"],
};

export function canTransitionPayrollReview(from: PayrollAdjustmentStatus, to: PayrollAdjustmentStatus): boolean {
  return payrollAdjustmentTransitions[from].includes(to);
}
