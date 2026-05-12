import { describe, it, expect } from "vitest"

import { generateAudit }
    from "../src/utils/auditEngine"

describe("Audit Engine", () => {

    it("detects Cursor Business overspending", () => {

        const result = generateAudit({
            tool: "Cursor",
            plan: "Business",
            seats: 2,
            teamSize: 2,
            spend: 100,
        })

        expect(result.savings).toBeGreaterThan(0)
    })

    it("detects ChatGPT Enterprise overspending", () => {

        const result = generateAudit({
            tool: "ChatGPT",
            plan: "Enterprise",
            seats: 3,
            teamSize: 12,
            spend: 150,
        })

        expect(result.savings).toBeGreaterThan(0)

        expect(result.recommendation)
            .toContain("ChatGPT Team")
    })

    it("calculates annual savings correctly", () => {

        const result = generateAudit({
            tool: "Claude",
            plan: "Enterprise",
            seats: 5,
            teamSize: 5,
            spend: 500,
        })

        expect(result.annualSavings)
            .toBe(result.savings * 12)
    })

    it("returns optimization metrics", () => {

        const result = generateAudit({
            tool: "Gemini",
            plan: "Enterprise",
            seats: 4,
            teamSize: 4,
            spend: 300,
        })

        expect(result.optimizationScore)
            .toBeDefined()

        expect(result.riskLevel)
            .toBeDefined()
    })

    it("returns optimized setup when no savings exist", () => {

        const result = generateAudit({
            tool: "ChatGPT",
            plan: "Plus",
            seats: 1,
            teamSize: 1,
            spend: 20,
        })

        expect(result.savings).toBe(0)

        expect(result.recommendation)
            .toContain("optimized")
    })

})