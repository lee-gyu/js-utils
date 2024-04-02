import { object, string } from "src/index.mjs";

describe("object", () => {
    test("#1 parsing string", () => {
        const model = object({
            name: string({ defaultValue: "lee-gyu" }),
        });

        const obj = model.parse({});

        expect(obj).toEqual({ name: "lee-gyu" });
    });

    test("#2 parsing object", () => {
        const model = object({
            service: object({
                id: string(),
                path: string(),
            }),
            version: string({ defaultValue: "1.0.0" }),
        });

        const obj = model.parse({
            service: {
                id: "app",
                path: "/app",
            },
        });

        expect(obj).toEqual({
            service: {
                id: "app",
                path: "/app",
            },
            version: "1.0.0",
        });
    });
});
