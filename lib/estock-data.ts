export type StockStatus = "healthy" | "low" | "expiring" | "out";

export type Product = {
  id: number;
  sku: string;
  barcode: string;
  englishName: string;
  composition: string;
  group: string;
  company: string;
  form: string;
  dose: string;
  arabicName: string;
  stockByBranch: { branchId: number; quantity: number; expiry: string; cost: number; sell: number }[];
};

export type Sale = {
  id: number;
  customerId: number;
  total: number;
  date: string;
  cashier: string;
  branchId: number;
  items: { productId: number; quantity: number; sell: number; cost: number; expiry: string }[];
};

export type Purchase = {
  id: number;
  vendorId: number;
  total: number;
  date: string;
  invoiceNo: string;
  items: { productId: number; quantity: number; cost: number; sell: number; expiry: string }[];
};

export const branches = [
  { id: 1, name: "الفرع الرئيسي", sourceNameAvailable: false },
  { id: 2, name: "الفرع الثاني", sourceNameAvailable: false },
];

export const products: Product[] = [
  { id: 1, sku: "1", barcode: "62211635", englishName: "ONE TWO THREE 20 TAB", composition: "PSEUDOEPHEDRINE+PARACETAMOL+CHLORPHENIRA", group: "Allergic Rhinit/Sinusitis", company: "NOT AVAILABLE", form: "Tablet", dose: "One Unit", arabicName: "", stockByBranch: [{ branchId: 1, quantity: 12, expiry: "2027-07-01", cost: 30, sell: 40 }, { branchId: 2, quantity: 0, expiry: "2027-07-01", cost: 30, sell: 40 }] },
  { id: 2, sku: "2", barcode: "6221000003295", englishName: "ONE TWO THREE syrup", composition: "PSEUDOEPHEDRINE+PARACETAMOL+CHLORPHENIRA", group: "Allergic Rhinit/Sinusitis", company: "AVENTIS PHARMA", form: "Syrup", dose: "One Unit", arabicName: "", stockByBranch: [{ branchId: 1, quantity: 2, expiry: "2028-05-01", cost: 24.32, sell: 32 }, { branchId: 2, quantity: 4, expiry: "2028-05-01", cost: 24.32, sell: 32 }] },
  { id: 3, sku: "3", barcode: "", englishName: "5 - FLUORO- URACIAL 250 MG 10 AMP", composition: "5-FLUOROURACIL 250 MG", group: "Anti-Cancer/Cytotoxic", company: "ROLAB", form: "Ampoule", dose: "One Unit", arabicName: "", stockByBranch: [{ branchId: 1, quantity: 0, expiry: "2020-10-10", cost: 17.6, sell: 20 }, { branchId: 2, quantity: 0, expiry: "2020-10-10", cost: 17.6, sell: 20 }] },
  { id: 7443, sku: "7443", barcode: "", englishName: "PARACETAMOL 500 MG", composition: "PARACETAMOL", group: "Analgesic", company: "HEALTHY", form: "Tablet", dose: "Tablet", arabicName: "", stockByBranch: [{ branchId: 1, quantity: 5, expiry: "2026-05-01", cost: 5.76, sell: 8 }] },
  { id: 30818, sku: "30818", barcode: "", englishName: "VITAMIN C 1G", composition: "ASCORBIC ACID", group: "Vitamin", company: "AMECO", form: "Effervescent tablet", dose: "Tablet", arabicName: "", stockByBranch: [{ branchId: 1, quantity: 28, expiry: "2027-02-01", cost: 22.3, sell: 46 }] },
];

export const sales: Sale[] = [
  { id: 1, customerId: 4, total: 44.5, date: "2024-08-16 18:44", cashier: "Cashier 1", branchId: 1, items: [{ productId: 7443, quantity: 1, sell: 8, cost: 5.76, expiry: "2026-05-01" }] },
  { id: 2, customerId: 1, total: 46, date: "2024-08-16 19:05", cashier: "Cashier 1", branchId: 1, items: [{ productId: 30818, quantity: 1, sell: 46, cost: 22.3, expiry: "2027-02-01" }] },
  { id: 3, customerId: 2, total: 75.5, date: "2024-08-16 19:13", cashier: "Cashier 1", branchId: 1, items: [{ productId: 1, quantity: 1, sell: 40, cost: 30, expiry: "2027-07-01" }] },
];

export const purchases: Purchase[] = [
  { id: 1, vendorId: 1, total: 881.65, date: "2024-06-12", invoiceNo: "4212", items: [{ productId: 1, quantity: 10, cost: 25, sell: 40, expiry: "2027-07-01" }] },
  { id: 2, vendorId: 1, total: 2403, date: "2024-06-12", invoiceNo: "4213", items: [{ productId: 2, quantity: 12, cost: 17, sell: 25, expiry: "2028-05-01" }] },
  { id: 3, vendorId: 2, total: 1448.81, date: "2024-08-15", invoiceNo: "3", items: [{ productId: 3, quantity: 2, cost: 12.32, sell: 16, expiry: "2025-05-01" }] },
];

export const sourceStats = { products: 35809, salesLines: 77724, purchaseLines: 29678, amountChanges: 112517, files: 33 };

export function getProduct(id: number) { return products.find((product) => product.id === id); }
export function stockFor(product: Product, branchId = 1) { return product.stockByBranch.find((stock) => stock.branchId === branchId) ?? product.stockByBranch[0]; }
export function statusFor(product: Product, branchId = 1): StockStatus {
  const stock = stockFor(product, branchId);
  if (!stock || stock.quantity <= 0) return "out";
  if (stock.expiry < "2026-08-24") return "expiring";
  if (stock.quantity <= 5) return "low";
  return "healthy";
}
export function displayName(product: Product) { return product.arabicName.trim() || product.englishName; }
