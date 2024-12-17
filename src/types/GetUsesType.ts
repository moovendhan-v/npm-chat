export interface UserFilters {
    id?: string;
    name?: string;
}

export type RequestOptions = {
    pagination: Pagination;
    select: Select;
    selectedFields: string[];
}

type Pagination = {
    skip: number;
    take: number;
}

type Select = {
    [key: string]: boolean;
}


export type PaginationOptions = {
    skip: number;
    take: number;
};

export type SelectedFields = string[];
