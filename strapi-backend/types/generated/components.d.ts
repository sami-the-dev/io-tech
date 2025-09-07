import type { Schema, Struct } from '@strapi/strapi';

export interface ContentSubtitle extends Struct.ComponentSchema {
  collectionName: 'components_content_subtitles';
  info: {
    description: 'Subtitle with bullet points for legal services';
    displayName: 'Subtitle';
  };
  attributes: {
    points: Schema.Attribute.JSON & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.subtitle': ContentSubtitle;
    }
  }
}
