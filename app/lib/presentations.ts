import { Presentation } from "./types";

const presentationData: Presentation[] = [
  {
    id: "machina-ex-deus",
    title: "Machina ex Deus",
    description:
      "This is from a book that I am writing on the the domination of capital in it's mechanistic form over organic matter.",
    date: "2025-11-06",
    thumbnail:
      "https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/498/697/509/742/489/small/4896b38c25462d77.png",
    type: "revealjs",
    htmlPath: "/presentations/machina-ex-deus/index.html",
  },
  {
    id: "crypto",
    title: "Cryptocurrency & Blockchain",
    description:
      "A talk I gave in secondary school on how blockchain works and why it's important.",
    date: "2022-08-27",
    thumbnail:
      "https://pxscdn.com/public/m/_v2/509323432926307502/0c2c69eb8-6377a8/Fz16scUse8vv/Vv0EMp1zI0KE22TWN20BpFzT5cyYlymYg24Tb9yj.png",
    type: "pdf",
    pdfPath: "/presentations/Crypto.pdf",
  },
  {
    id: "open-source-linux",
    title: "Open Source & Linux",
    description:
      "An overview on open source software, also I talk I gave in secondary school.",
    date: "2023-01-20",
    thumbnail:
      "https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/498/676/782/856/251/small/e4d8a2bd77ac084c.png",
    type: "pdf",
    pdfPath: "/presentations/Open-Source-and-Linux.pdf",
  },
  {
    id: "s4p-divestment",
    title: "S4P Divestment Teach-in",
    description:
      "The history and structure of stem 4 palastines divestment campagin",
    date: "2025-10-05",
    thumbnail:
      "https://pxscdn.com/public/m/_v2/509323432926307502/0c2c69eb8-6377a8/7r3FZVNB8h0S/reKqH34b8hrI92ZNjMP2DrDpfhOKTX6Zi47bzhoP.png",
    type: "pdf",
    pdfPath: "/presentations/S4P-Divestment-Teach-in.pdf",
  },
  {
    id: "linux-and-that",
    title: "Linux and That",
    description: "A talk I gave quite drunk at a pajama presentaion party.",
    date: "2025-09-26",
    thumbnail:
      "https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/498/729/512/575/161/small/a304f7e99ed59f4b.png",
    type: "pdf",
    pdfPath: "/presentations/Linux-and-That.pdf",
  },
  {
    id: "spinoza-god",
    title: "Spinoza's God",
    description: "The panthestic cosmology of Spinoza, a talk for 25B.",
    date: "2025-03-03",
    thumbnail:
      "https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/498/706/749/274/723/small/138a788bb5305b68.png",
    type: "pdf",
    pdfPath: "/presentations/Spinozas-God.pdf",
  },
  {
    id: "investing-sdg",
    title: "Investing for SDG 1 & 10",
    description: "A bit of a troll talk I gave for an ethical investing class",
    date: "2025-06-28",
    thumbnail:
      "https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/498/689/613/212/451/small/be037362de86ac70.png",
    type: "pdf",
    pdfPath: "/presentations/Investing-for-SDG-1-and-10.pdf",
  },
  {
    id: "descares-med",
    title: "Descartes Meditations",
    description:
      "A presentation I gave for 25B on the silly mistakes of Descartes in the his Meditations",
    date: "2025-02-18",
    thumbnail:
      "https://static-assets-1.truthsocial.com/tmtg:prime-ts-assets/media_attachments/files/115/498/721/092/888/924/small/750b219c6a67d19b.png",
    type: "pdf",
    pdfPath: "/presentations/Descartes-Meditations.pdf",
  },
  {
    id: "organiser-security-training",
    title: "Basic Digital Security for Organisers",
    description: "An opsec 101 a gave for an organing circle",
    date: "2025-02-18",
    thumbnail:
      "https://pxscdn.com/public/m/_v2/509323432926307502/0c2c69eb8-6377a8/oEDsN240rcqr/ybBFHNlibTmsXP99EdJ6NOpuDC1Cz46ESTLpN5zY.png",
    type: "pdf",
    pdfPath: "/presentations/Digital-Security-Training.pdf",
  },
];

const normalizePath = (path: string) => {
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/presentations/${path}`;
};

export const presentations = presentationData
  .map((presentation) => {
    if (presentation.type === "pdf") {
      return {
        ...presentation,
        pdfPath: normalizePath(presentation.pdfPath),
      };
    }

    return {
      ...presentation,
      htmlPath: normalizePath(presentation.htmlPath),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
