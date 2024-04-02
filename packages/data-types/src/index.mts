interface TypePropertyArgs<T> {
    defaultValue?: T;
}

export type TypeProperty<T> = {
    get defaultValue(): T;
    typeName: string;
};

function typeBasePrototype<T>(
    args: TypePropertyArgs<T>,
    typeName: string
): TypeProperty<T> {
    return {
        get defaultValue() {
            return args.defaultValue;
        },
        typeName,
    };
}

export function string(args?: TypePropertyArgs<string>) {
    return typeBasePrototype(args, "string");
}

interface ObjectSchemeArgs {
    [key: string]: TypeProperty<unknown>;
}

export function object<T extends ObjectSchemeArgs>(args: T) {
    const base = typeBasePrototype(args, "object");

    return {
        ...base,
        parse,
    };

    function parse(obj: unknown) {
        const parsed = {};

        const keys = Object.keys(obj);

        for (const key of keys) {
            // it will pass if the key is not in the scheme
            if (!args[key]) continue;

            parsed[key] = args[key].parse(obj[key]);
        }

        return parsed;

        function dfs(obj: object) {}
    }
}
