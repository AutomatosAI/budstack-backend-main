export class AgentsCommissionSummary {
  totalAgents: number;
  activeAgents: number;
  inActiveAgents: number;
  totalSales: number;
  totalCommission: number;
  totalPaidCommission: number;
  totalPendingCommission: number;
}

export class CommissionSummary {
  PENDING: {
    amountInDollar: number;
    amountInEth: number;
  };
  PAID: {
    amountInDollar: number;
    amountInEth: number;
  };
  totalInDollar: number;
}

export class ClientsSummary {
  PENDING: number;
  VERIFIED: number;
  REJECTED: number;
  totalCount: number;
}
