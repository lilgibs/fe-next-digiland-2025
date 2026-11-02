import Image from "next/image";
import medalHm from "../../../public/medals/medals_21k.png";
import medal10k from "../../../public/medals/medals_10k.png";
import medal5k from "../../../public/medals/medals_5k.png";
import bib from "../../../public/rpc/bib.png";
import bag from "../../../public/rpc/tas.png";
import jersey from "../../../public/rpc/jersey.png";

const MEDALS = { HM: medalHm, "10K": medal10k, "5K": medal5k };

export function Medal({ category }: { category: keyof typeof MEDALS }) {
  return (
    <Image
      src={MEDALS[category]}
      alt={`Medali finisher ${category} Digiland Run 2025`}
      sizes="(max-width: 767px) 40vw, (max-width: 1023px) 256px, 176px"
    />
  );
}

export function BibArtwork() {
  return (
    <Image
      src={bib}
      className="run-pack-bib"
      alt="Nomor BIB kategori 5K, 10K, dan Half Marathon"
      sizes="(max-width: 1023px) 220px, 200px"
    />
  );
}

export function BagArtwork() {
  return (
    <Image
      src={bag}
      className="run-pack-bag"
      alt="Goodie bag Digiland Run 2025"
      sizes="(max-width: 1023px) 240px, 190px"
    />
  );
}

export function JerseyArtwork() {
  return (
    <Image
      src={jersey}
      className="run-pack-jersey"
      alt="Jersey Digiland Run 2025"
      sizes="(max-width: 1023px) 280px, 200px"
    />
  );
}
