export interface books {
  title: string;
  author: string;
  year: number;
  type: "book";
  poster: string;
  url: string;
  readingNow?: boolean;
  startDate?: string;
  star: string;
  starIcon?: string;
}

export const booksData: books[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/41C-012Es8L._SY445_SX342_.jpg",
    url: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    readingNow: true,
    startDate: "2024-02-24",
    star: "5",
    starIcon: "https://img.icons8.com/ios/50/000000/star--v1.png",
  },
  {
    title: "Nutuk",
    author: "Mustafa Kemal Atatürk",
    year: 2010,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/817kr9Z1ItL._SY466_.jpg",
    url: "https://www.amazon.com/Nutuk-Fotograflarla-Mustafa-Kemal-Ataturk/dp/9944888346/ref=sr_1_1?crid=3BOBIKRXAOH96&dib=eyJ2IjoiMSJ9.YajaxgWYMKegISYatMa76rG8WcAFFN1neh_kjs2RFQgbaUFYC6Qmmdf_0vQNNen8vUcVns3qXBPthoZ5w7viIWKbSuJg5CWGgitfViCHWi1uQebtRwZpZNRr8sHlfJfDHrV238H4fkv7MbyA6mgyJ9IXGizPsQBLonHgDUWrLrtyviTRzTfu2SvfHUEWuj8RWE25IiJdTkCvygO4sGOcVeHVohtQEBv03_w8c1vEbkA.sMUFydjaa_IiHTija_HYAJha6u-CpdW23w0F1OY8zCk&dib_tag=se&keywords=Nutuk&qid=1709916349&s=books&sprefix=nutuk%2Cstripbooks-intl-ship%2C192&sr=1-1",
    star: "5",
  },
  {
    title: "20. Yuzyilin En Büyük Lideri Atatürk",
    author: "İlker Basbug",
    year: 2012,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/71hfMJMNObL._AC_UY218_.jpg",
    url: "https://www.amazon.com/Yuzyilin-Buyuk-Lideri-Ataturk-1923ten/dp/9751415292/ref=sr_1_1?crid=2HJS0JMILG7ZP&dib=eyJ2IjoiMSJ9.Z-HgcQtBujJ5LIcqdqH-fPAsqOOf2FV22HyhnYHbg0w.OdsWJoSTfz4wuFCTmTeZHoZqzO_Ol1qTM4h3Dd__Bks&dib_tag=se&keywords=20.+y%C3%BCzy%C4%B1l%C4%B1n+en+b%C3%BCy%C3%BCk+lideri+Atat%C3%BCrk&qid=1709916749&s=books&sprefix=20.+y%C3%BCzy%C4%B1l%C4%B1n+en+b%C3%BCy%C3%BCk+lideri+atat%C3%BCrk%2Cstripbooks-intl-ship%2C326&sr=1-1",
    star: "5",
  },
  {
    title: "Ben, Steve",
    author: "George W. Beahm",
    year: 2011,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/715tzwkh2NL._SY466_.jpg",
    url: "https://amazon.com.tr/Ben-Steve-%C4%9Eeor%C4%9Fe-W-Beahm/dp/9753297416/ref=sxts_rp_s_1_0?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&content-id=amzn1.sym.04d73888-c089-41a4-a0e8-765e9b48ef2c%3Aamzn1.sym.04d73888-c089-41a4-a0e8-765e9b48ef2c&crid=1KKYO2LSNJB22&cv_ct_cx=Ben+Steve&dib=eyJ2IjoiMSJ9.77zSn3j1cCaNs3jkZD2soQ.b8yizb0GEAtF3jfUPNPAeWVnrHgdzn14cDyNQVatVLk&dib_tag=se&keywords=Ben+Steve&pd_rd_i=9753297416&pd_rd_r=7e54ac10-0a89-450f-b8f3-a38a3dfce148&pd_rd_w=bBYCK&pd_rd_wg=OA0tn&pf_rd_p=04d73888-c089-41a4-a0e8-765e9b48ef2c&pf_rd_r=4AT4XEK7APAYG2ESNAZQ&qid=1709917009&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=ben+stev%2Caps%2C111&sr=1-1-1890b328-3a40-4864-baa0-a8eddba1bf6a",
    star: "5",
  },
  {
    title: "Fareler ve İnsanlar",
    author: "John Steinbeck",
    year: 2019,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/41HOPkBKtFL._SY445_SX342_.jpg",
    url: "https://www.amazon.com.tr/Fareler-ve-%C4%B0nsanlar-John-Steinbeck/dp/9755705856/ref=sr_1_1?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=134SU5TK997HS&dib=eyJ2IjoiMSJ9.WX7cXSM1VDQqF91yKPaN1RUG-sgoVTYJ2gMjcBoTYNfYp5eqvu787aASh9HEdKhS04OMkn_4tHTdHFARDkHVrYAzhyfyDSNmyWIFutCWRnQub4NthLeD8MXCDlTvwKEJif66wd3vYLr0IAHn-HwtVTsNAiMQ6mItj_F485Fub67zQjO0v-KKHbs1guO7WE4F.BzyHrYYieeUejbpeeAueN4AUUIxFCQif5FfP9eq82-U&dib_tag=se&keywords=fareler+ve+insanlar+sel&qid=1709917362&s=books&sprefix=fareler+ve+insanlar+sel%2Cstripbooks%2C114&sr=1-1",
    star: "5",
  },
  {
    title: "Donusum",
    author: "Franz Kafka",
    year: 2014,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/41JHK3xEgPL._SX342_SY445_.jpg",
    url: "https://www.amazon.com.tr/D%C3%B6n%C3%BC%C5%9F%C3%BCm-Franz-Kafka/dp/9750719352/ref=sr_1_3?crid=BTNQBX8SSSMJ&dib=eyJ2IjoiMSJ9.Sa3ODfmQbNgX6Dn1XX5EPJAVikqoiEwN5Zs9PeVGIIczJ3lYR8lzBfNHIZdURWd1_-hSvlqUOwWZ4aTjlQ3kRr-0lkkt9-LZ4MQgN8o3ccYhPJISV-alw0D-HVrC4cYYAVjdVccGenfJmZuyGqDQMCw4JGH8H90gvpDCW0PfvpAV2l-exwISZzQTARZdcz7rGIOQNiaiK13XWu5SQUIQtMPWt9ZbII7eDtsDYMK43CU.oX4lkj_4RqaAq3BtmGR8J-5L103UE10r7zE89sHFN4k&dib_tag=se&keywords=d%C3%B6n%C3%BC%C5%9F%C3%BCm+can+yay%C4%B1nlar%C4%B1&qid=1709917343&s=books&sprefix=D%C3%B6n%C3%BC%C5%9F%C3%BCm+can%2Cstripbooks%2C112&sr=1-3",
    star: "5",
  },
  {
    title: "Beyaz Gemi",
    author: "Cengiz Aytmatov",
    year: 2016,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/6164z2l258L._SY466_.jpg",
    url: "https://www.amazon.com.tr/Beyaz-Gemi-Aytmatov-Eserleriyle-Dilde/dp/9754370435/ref=sr_1_1?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2ZY07EVDG84CS&dib=eyJ2IjoiMSJ9.TLFh7psPyLSfLzuF3m1STZcKR0MIR2YL7lG7YjJ_O09yOH6rR-wmKVaAIcySKZkleJFh2rK3rbuTpqUYSA06mLxPZxTbi0F6nbw--3C7TEEiPv8NvcaCiMJaMb6ew13lyArXZ6lMik3YLJrLangp7HNcdzFvaSGr2YDgPx8LhyXwpnIxmgfXmZs55Qs0fr2W6V3Y_QAF5SvlqoBqkUKjVvUuKXwKr48S4JTt2qH6RU4.7Lygp4LOv70pb1dM6HY_W1eh8K71k39Z-q7on3r02XA&dib_tag=se&keywords=Beyaz+Gemi&qid=1709917389&s=books&sprefix=beyaz+gemi%2Cstripbooks%2C114&sr=1-1",
    star: "5",
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    year: 2014,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/51fpspl0LzL._SY466_.jpg",
    url: "https://www.amazon.com.tr/Siddhartha-Hermann-Hesse/dp/9750719395/ref=sr_1_1?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=FJX3MI65DFKZ&dib=eyJ2IjoiMSJ9.nK-_QXz4ppJ7xSYMGQQwUVYFbq3Wig3qWdpIy0fRgVta0sbtPngZS9WmAXnjLJ_k92teZ9kV_Ge-dGZNd4EoUekRAgVrQqDyy8nDoFcbubK6Kl5zdAvEKNBPu-GriwQRbhVPlEChsgSg4F48MB_fRC3oyMlWfiDkWCi9ypHvyB2Bq1KV21Gxx7AvhTqUjyhajrrrnlclpC3g8THR9mgx9DSv1Y7sbvNF1RM1IO_q7ac.MKH96wyydmBskhmKwx3ueshBAKnPtGniUvPOOpLY91w&dib_tag=se&keywords=Siddhartha&qid=1709917499&s=books&sprefix=siddhartha%2Cstripbooks%2C111&sr=1-1",
    star: "5",
  },
  {
    title: "Assassin's Creed Ronesans",
    author: "Oliver Bowden",
    year: 2014,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/61Rzqf5AjiL._SY466_.jpg",
    url: "https://www.amazon.com.tr/Assassins-Creed-R%C3%B6nesans-Suikast%C3%A7%C4%B1n%C4%B1n-%C4%B0nanc%C4%B1/dp/9944828378/ref=sr_1_1?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=PDVUYJU75VNV&dib=eyJ2IjoiMSJ9.nL7VTpR9NFjQFo1qw06TlFK2evx40kWzf3NUwn7AvIDGjHj071QN20LucGBJIEps.TFJrviNGp-gc83X1nRoPEH7CkMkrvlFNsriliEQW51g&dib_tag=se&keywords=assassin+%27s+creed%3A+r%C3%B6nesans&qid=1709917558&s=books&sprefix=assassin%27s+creed+r%C3%B6nesans%2Cstripbooks%2C113&sr=1-1",
    star: "5",
  },
  {
    title: "The Witcher: Son Dilek",
    author: "Andrzej Sapkowski",
    year: 2017,
    type: "book",
    poster: "https://m.media-amazon.com/images/I/41yWxgjTAGL._SX342_SY445_.jpg",
    url: "https://www.amazon.com.tr/Son-Dilek-Andrzej-Sapkowski/dp/605299018X/ref=sr_1_1?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3FAHU0V7AP7FN&dib=eyJ2IjoiMSJ9.hEho1F3Kxh5JaqUSmjhlm15NTIZzKlJEwK4QcVRpCnuZxjkSU8MW8aNZzSZSjSxHA9S0mxI8DJGvR3cxJUDnvmScd66f7KRFn4bRPxXsoFMYUksKwx1Iw-ZWzXjauL-_iKG5dCjD52GAMv-nAGJc8-xEggo6ugmKcqHJhHOtEPUTjznR3hzlwf7ay7v9XYAezP8UMgtB-axld0nvZgy2iKCzqQwI9ejUKJMdof9Ov2Qcific77PXLrvIG--C4S5OmcOEdgYQ1JRe9Cu3b62zKSLi7zwnjB-yfXeWv2etaOk.jlKZrjgwo8P0MfBxcdiSniQGR0GAb3yWs00CqDtSUCE&dib_tag=se&keywords=Son+Dilek&qid=1709917680&sprefix=son+dilek%2Caps%2C126&sr=8-1",
    star: "5",
  },
];