export interface Article {
    title: string;
    description: string;
    body: string;
    tag?: string | string[];
    slug?: string;
}

export interface InvalidArticle extends Article {
    testDescription: string;
    errorMessage: string;
    isKnownBug: boolean;
}