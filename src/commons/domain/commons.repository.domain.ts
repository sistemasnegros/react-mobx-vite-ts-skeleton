// export type IReturnRepository<T> = [T, null | string | null];
export type IReturnRepository<T> = [T, null] | [null, string];

export type IReturnDomain<T, K> = [T, null] | [null, K];
