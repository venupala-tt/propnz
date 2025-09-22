/* types.d.ts */
import { Document } from '@contentful/rich-text-types';
import {Asset} from '@contentful/rich-text-types';
import { Link } from 'contentful';

export type BlogItem = {
    fields: {
        title: string;
        slug: string;
        date: Date;
        heroImage: Asset;
        content: Document;
        description: string;   

      //  heroImage: string;
    }
}

export type PropItem = {
    fields: {
        ptitle: string;
        slug: string;
        description:  Document; 
        image: Asset;
    }
}


export type BlogItems = ReadonlyArray<BlogItem>;

export type PropItem = ReadonlyArray<PropItem>;


export type BlogQueryResult = {
    items: BlogItems;
}

export type PropQueryResult = {
    items: PropItems;
}

