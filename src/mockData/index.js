import { nanoid } from "nanoid"
import randomItem from "random-item"
import { packArtworkUrls } from "./packArtworkUrls"

export const mockData = {
  freshPacksLinks: [
    { text: "new samples", url: "#" },
    { text: "new presets", url: "#" },
    { text: "new midi", url: "#" },
  ],

  popularPacksLinks: [
    { text: "popular samples", url: "#" },
    { text: "popular presets", url: "#" },
    { text: "popular midi", url: "#" },
  ],

  newPacks: [
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
  ],

  popularPacks: [
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
    {
      artistName: "artist.name1234",
      artworkUrl: randomItem(packArtworkUrls),
      title: "Awesome Pack Name",
      titleId: "awesome-pack-name",
      tags: ["dirty", "futurebass", "dubstep"],
      _id: nanoid(),
    },
  ],
}
