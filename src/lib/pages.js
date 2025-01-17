import { getSanityData, groqLinkType } from "./sanity";

export const homePage = await getSanityData(`*[_type == 'home'][0]{
  "pageName": name,
  hero{
    heading,
    text,
    "linkItem": link{
      ${groqLinkType}
    },
    "image": image{
      ...,
      asset->
    }
  },
  intro{
    heading,
    text,
    "entries": items[]{
      heading,
      text,
      "linkItem": link{
        ${groqLinkType}
      }
    }
  },
  presentation{
    text,
    "linkItem": sectionLink{
      ${groqLinkType}
    },
    entries[]{
      heading,
      text,
      "linkItem": link{
        ${groqLinkType}
      },
      "image": image{
        ...,
        asset->
      }
    }
  },
  cta{
    heading,
    text,
    accent,
    "linkItem": link{
      ${groqLinkType}
    },
    "image": image{
      ...,
      asset->
    }
  },
  "seo": {
    "title": seoTitle,
    "description": seoDescription,
    "ogTitle": openGraph.title,
    "ogDescription": openGraph.description,
    "ogImage": openGraph.image{
      ...,
      asset->
    }
  }
}`);

export const pages = await getSanityData(`*[_type == 'page']{
  _id,
  "slug": slug{
    current,
    "full": fullUrl
  },
  sectionSlug,
  "pageName": name,
  "headerText": description,
  "pageContent": contentSections[]{
    _type == 'introSections' => {
      "type": _type,
      heading,
      text,
      "entries": introSections[]{
        heading,
        "text": previewText,
        mediaType,
        "image": image{
          ...,
          asset->
        },
        video,
      }
    },
    _type == 'contentFeatures' => {
      "type": _type,
      heading,
      text,
      "entries": featureItems[]{
        "heading": title,
        "text": description,
        "linkItem": link{
          ${groqLinkType}
        },
        "image": image{
          ...,
          asset->
        }
      }
    },
    _type == 'highlightGrid' => {
      "type": _type,
      heading,
      text,
      "entries": items[]{
        heading,
        text,
        "linkItem": link{
          ${groqLinkType}
        }
      }
    },
    _type == 'faq' => {
      "type": _type,
      heading,
      text,
      "entries": faqItems[]{
        question,
        answer
      }
    },
    _type == 'richContent' => {
      "type": _type,
      "portableText": content[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "linkItem": {
              "type": @.reference->_type,
              "sectionSlug": @.reference->sectionSlug,
              "href": @.reference->slug{
                current,
                "full": fullUrl
              }
            }
          }
        },
        _type == "image" => {
          ...,
          asset->
        },
        _type == 'youtube' => {
          ...,
        },
        _type == 'table' => {
          "type": _type,
          title,
          rows[]{
            header,
            "entries": item[]
          }
        },
      }
    },
    _type == 'gallery' => {
      "type": _type,
      heading,
      text,
      "entries": galleryItems[]{
        ...,
        asset->
      }
    },
    _type == 'staffIndex' => {
      "type": _type,
      heading,
      entries[]->{
        name,
        title,
        "image": image{
          ...,
          asset->
        },
        isDirector,
        bio
      }
    },
    _type == 'dateList' => {
      "type": _type,
      heading,
      text,
      entries[]|order(date asc){
        heading,
        date,
        text,
        parentAndFamily,
        "linkItem": link{
          ${groqLinkType}
        },
        range,
        range == true => {
          endDate
        }
      }
    },
    _type == 'cta' => {
      "type": _type,
      heading,
      text,
      accent,
      "linkItem": link{
        ${groqLinkType}
      },
      "image": image{
        ...,
        asset->
      }
    }
  },
  "seo": {
    "title": seoTitle,
    "description": seoDescription,
    "ogTitle": openGraph.title,
    "ogDescription": openGraph.description,
    "ogImage": openGraph.image{
      ...,
      asset->
    }
  }
}`);

export function getCurrentPage(id) {
  // Return all page data from pageData Sanity query
  // Sanity API only called once
  return pages.find((page) => page._id === id);
}
