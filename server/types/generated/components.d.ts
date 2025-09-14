import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksSubtitles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_subtitles';
  info: {
    displayName: 'subtitles';
  };
  attributes: {
    points: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.subtitles': BlocksSubtitles;
    }
  }
}
