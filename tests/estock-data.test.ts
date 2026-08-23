import { describe, expect, it } from "vitest";
import { displayName, getProduct, sales, statusFor, stockFor } from "../lib/estock-data";

describe("eStock recovered data model", () => {
  it("does not surface lost Arabic question-mark values", () => {
    const product = getProduct(1);
    expect(product).toBeTruthy();
    expect(displayName(product!)).toBe(product!.englishName);
    expect(displayName(product!)).not.toContain("?");
  });

  it("derives stock status from branch quantity and expiry", () => {
    expect(statusFor(getProduct(1)!, 1)).toBe("healthy");
    expect(statusFor(getProduct(1)!, 2)).toBe("out");
    expect(statusFor(getProduct(3)!, 1)).toBe("out");
    expect(stockFor(getProduct(1)!, 1)?.sell).toBe(40);
  });

  it("keeps sales line items connected to products", () => {
    const firstLine = sales[0].items[0];
    expect(getProduct(firstLine.productId)?.englishName).toBe("PARACETAMOL 500 MG");
    expect(firstLine.quantity).toBeGreaterThan(0);
  });
});
