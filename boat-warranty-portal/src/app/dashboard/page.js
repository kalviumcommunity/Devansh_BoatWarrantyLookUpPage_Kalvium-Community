import { computeExpiry, prisma } from "@/lib/db";

function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#111827",
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const [products, repairCount, documentCount, recentRepairs] =
    await Promise.all([
      prisma.productRegistry.findMany({
        select: {
          purchaseDate: true,
          warrantyDurationMonths: true,
        },
      }),
      prisma.repairHistory.count(),
      prisma.warrantyDocument.count({
        where: { deletedAt: null },
      }),
      prisma.repairHistory.findMany({
        take: 5,
        orderBy: { repairDate: "desc" },
        select: {
          repairId: true,
          serialNumber: true,
          repairDate: true,
          issueDescription: true,
          serviceCenterCode: true,
        },
      }),
    ]);

  const today = new Date();

  const activeWarranties = products.filter((product) => {
    const expiry = computeExpiry(
      product.purchaseDate,
      product.warrantyDurationMonths,
    );

    return expiry >= today;
  }).length;

  const expiredWarranties = products.length - activeWarranties;

  return (
    <div>
      <h1 style={{ margin: "0 0 24px", fontSize: 26 }}>
        Dashboard overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard
          label="Total Products"
          value={products.length}
          color="#2563eb"
        />
        <StatCard
          label="Active Warranties"
          value={activeWarranties}
          color="#16a34a"
        />
        <StatCard
          label="Expired Warranties"
          value={expiredWarranties}
          color="#dc2626"
        />
        <StatCard
          label="Repair Records"
          value={repairCount}
          color="#9333ea"
        />
        <StatCard
          label="Warranty Documents"
          value={documentCount}
          color="#ea580c"
        />
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ margin: "0 0 16px", fontSize: 18 }}>
          Recent Repairs
        </h2>

        {recentRepairs.length === 0 ? (
          <p style={{ color: "#6b7280", margin: 0 }}>
            No repair records have been added yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#6b7280" }}>
                  <th style={{ padding: "10px 8px" }}>Serial Number</th>
                  <th style={{ padding: "10px 8px" }}>Issue</th>
                  <th style={{ padding: "10px 8px" }}>Service Center</th>
                  <th style={{ padding: "10px 8px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRepairs.map((repair) => (
                  <tr key={repair.repairId} style={{ borderTop: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px 8px" }}>
                      {repair.serialNumber}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      {repair.issueDescription}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      {repair.serviceCenterCode}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      {new Date(repair.repairDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}