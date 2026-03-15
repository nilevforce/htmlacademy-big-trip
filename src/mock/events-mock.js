const eventsMock = [
  {
    'id': '31345b7d-82ed-47a2-a22d-556bbf0303ef',
    'basePrice': 860,
    'dateFrom': '2026-03-05T03:52:04.805Z',
    'dateTo': '2026-03-07T04:30:04.805Z',
    'destination': '48097653-2f66-4b5e-acff-ab8077717c38',
    'isFavorite': false,
    'offers': [
      'c4ce907c-9bd3-4cf9-8c99-0ba991d82387',
      '72f5fbe9-eca3-4f04-bd01-86ca8627d8a8'
    ],
    'type': 'taxi'
  },
  {
    'id': '8dbc2eab-032f-4bb5-a645-54f9f8bcde67',
    'basePrice': 5307,
    'dateFrom': '2026-03-07T16:26:04.805Z',
    'dateTo': '2026-03-08T05:00:04.805Z',
    'destination': 'ce80978e-b63d-4264-92ce-4e4ec2856b48',
    'isFavorite': true,
    'offers': [
      '32a1e392-d25f-4230-96dc-1df1572c08f6',
      'ab425a1f-a03a-4f06-8e59-4ab12db1a923',
      'dd6f2825-7e19-4b64-9651-932989e3e5ac'
    ],
    'type': 'bus'
  },
  {
    'id': 'cebad2b3-c3a7-41bb-8980-531d2ddb4d9a',
    'basePrice': 5112,
    'dateFrom': '2026-03-09T14:55:04.805Z',
    'dateTo': '2026-03-10T23:52:04.805Z',
    'destination': '48097653-2f66-4b5e-acff-ab8077717c38',
    'isFavorite': false,
    'offers': [
      'ea7648cd-633e-4cef-b63b-ffd9c539204a'
    ],
    'type': 'train'
  },
  {
    'id': 'f827c242-8d90-4a68-a288-fb4f100f2f31',
    'basePrice': 4731,
    'dateFrom': '2026-03-12T19:25:04.805Z',
    'dateTo': '2026-03-13T10:14:04.805Z',
    'destination': '83ba8748-f59d-41d3-8f33-d37bf16fa438',
    'isFavorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': '482cac98-16db-4e5e-9c35-b7dde367ed8a',
    'basePrice': 4457,
    'dateFrom': '2026-03-14T12:17:04.805Z',
    'dateTo': '2026-03-16T06:29:04.805Z',
    'destination': 'bb93c9d6-da47-4c50-8305-8809c05cf9c2',
    'isFavorite': true,
    'offers': [
      '2f0c097a-515c-493d-87af-5716d0c59fdf',
      '4828f91e-8365-4cc5-b70b-5b47241b9137'
    ],
    'type': 'check-in'
  },
  {
    'id': '785996f8-6588-4804-a88f-a867e1d53e43',
    'basePrice': 497,
    'dateFrom': '2026-03-17T16:13:04.805Z',
    'dateTo': '2026-03-18T10:30:04.805Z',
    'destination': 'ce80978e-b63d-4264-92ce-4e4ec2856b48',
    'isFavorite': false,
    'offers': [
      '0991854d-cc94-4928-8f51-a7fe7352cf77',
      'abf7a3aa-2bc7-45cd-acfd-cebf3d549dde',
      'ea7648cd-633e-4cef-b63b-ffd9c539204a'
    ],
    'type': 'train'
  },
  {
    'id': '401f0451-d086-4b08-833c-c39673a9e1c6',
    'basePrice': 6275,
    'dateFrom': '2026-03-19T20:31:04.805Z',
    'dateTo': '2026-03-20T23:47:04.805Z',
    'destination': '48097653-2f66-4b5e-acff-ab8077717c38',
    'isFavorite': false,
    'offers': [
      '17d940bf-26e5-41ac-a55d-c310bfb566f2',
      '3161709e-0149-43b0-8f64-31df0c36f751'
    ],
    'type': 'restaurant'
  },
  {
    'id': '520e6f52-9541-4e0d-afa0-af80ac545524',
    'basePrice': 9021,
    'dateFrom': '2026-03-22T15:03:04.805Z',
    'dateTo': '2026-03-23T08:45:04.805Z',
    'destination': 'bb93c9d6-da47-4c50-8305-8809c05cf9c2',
    'isFavorite': true,
    'offers': [
      'e1510811-423b-4ac2-8364-86fc0a195745'
    ],
    'type': 'drive'
  },
  {
    'id': '74129b5d-7fb3-4d19-96ed-742bdfec2c1f',
    'basePrice': 5902,
    'dateFrom': '2026-03-24T23:16:04.805Z',
    'dateTo': '2026-03-26T12:12:04.805Z',
    'destination': 'ab385db6-4fb4-4822-a9dc-747c6a32f41d',
    'isFavorite': false,
    'offers': [
      '32a1e392-d25f-4230-96dc-1df1572c08f6',
      'ab425a1f-a03a-4f06-8e59-4ab12db1a923',
      'dd6f2825-7e19-4b64-9651-932989e3e5ac'
    ],
    'type': 'bus'
  },
  {
    'id': '86d5301f-3519-4497-bf08-34d15aecbcc0',
    'basePrice': 7274,
    'dateFrom': '2026-03-27T04:49:04.805Z',
    'dateTo': '2026-03-27T12:46:04.805Z',
    'destination': '09ee2e9d-d6b5-4277-a4cd-3268a0bf9bee',
    'isFavorite': false,
    'offers': [],
    'type': 'train'
  },
  {
    'id': '879ef6a9-1560-40db-b9c1-d2a9364da70d',
    'basePrice': 603,
    'dateFrom': '2026-03-29T01:52:04.805Z',
    'dateTo': '2026-03-30T15:49:04.805Z',
    'destination': 'a536618b-a871-4beb-90e3-1aebc67b2c09',
    'isFavorite': true,
    'offers': [
      '727d5105-4cdb-403e-bfe1-d79da6747728',
      'e1510811-423b-4ac2-8364-86fc0a195745'
    ],
    'type': 'drive'
  },
  {
    'id': '576d3a8a-7ce4-460a-b5e4-84c0a041939d',
    'basePrice': 9598,
    'dateFrom': '2026-04-01T10:26:04.805Z',
    'dateTo': '2026-04-01T16:29:04.805Z',
    'destination': '35a960a2-1ad0-4106-b20d-150caa1ae691',
    'isFavorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': 'c67fe230-0ff8-4edc-87e8-fbedf5f14e6f',
    'basePrice': 188,
    'dateFrom': '2026-04-03T01:32:04.805Z',
    'dateTo': '2026-04-03T19:18:04.805Z',
    'destination': '40677488-305b-41c1-83f0-d14c42d80c65',
    'isFavorite': false,
    'offers': [
      'abf7a3aa-2bc7-45cd-acfd-cebf3d549dde',
      'ea7648cd-633e-4cef-b63b-ffd9c539204a'
    ],
    'type': 'train'
  },
  {
    'id': 'bb28570a-243b-4519-b7ab-ca2e98ba4e04',
    'basePrice': 1429,
    'dateFrom': '2026-04-04T16:24:04.805Z',
    'dateTo': '2026-04-06T03:33:04.805Z',
    'destination': '40677488-305b-41c1-83f0-d14c42d80c65',
    'isFavorite': false,
    'offers': [
      'a808569b-f207-4e87-894b-4a0a5336508c'
    ],
    'type': 'flight'
  },
  {
    'id': '984205f3-077e-49a9-93c3-583c65ff0521',
    'basePrice': 6109,
    'dateFrom': '2026-04-08T01:23:04.805Z',
    'dateTo': '2026-04-09T02:39:04.805Z',
    'destination': '35a960a2-1ad0-4106-b20d-150caa1ae691',
    'isFavorite': true,
    'offers': [
      '25883ae3-1ead-481b-b375-92d815ae8dde',
      'b03c36f4-1dd4-4c94-84eb-4b2110dfe49f',
      'c4ce907c-9bd3-4cf9-8c99-0ba991d82387',
      '72f5fbe9-eca3-4f04-bd01-86ca8627d8a8'
    ],
    'type': 'taxi'
  },
  {
    'id': '65b84fbc-ce22-4291-9d48-4a8f205d8497',
    'basePrice': 7809,
    'dateFrom': '2026-04-10T08:43:04.805Z',
    'dateTo': '2026-04-11T21:05:04.805Z',
    'destination': 'b1d782b5-fb18-41a8-a634-cb92cf5940f1',
    'isFavorite': false,
    'offers': [
      '727d5105-4cdb-403e-bfe1-d79da6747728',
      'e1510811-423b-4ac2-8364-86fc0a195745'
    ],
    'type': 'drive'
  },
  {
    'id': '1ecc5d3c-1f7a-49bc-9048-3451d0434468',
    'basePrice': 8433,
    'dateFrom': '2026-04-12T17:37:04.805Z',
    'dateTo': '2026-04-13T06:43:04.805Z',
    'destination': '40677488-305b-41c1-83f0-d14c42d80c65',
    'isFavorite': true,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': 'ae6c030c-4725-4db7-95ff-54320a2ed684',
    'basePrice': 268,
    'dateFrom': '2026-04-13T12:56:04.805Z',
    'dateTo': '2026-04-14T18:41:04.805Z',
    'destination': '35a960a2-1ad0-4106-b20d-150caa1ae691',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'dbe46f06-0b6f-4800-956e-0c372fbaf5d7',
    'basePrice': 2025,
    'dateFrom': '2026-04-16T07:18:04.805Z',
    'dateTo': '2026-04-17T17:17:04.805Z',
    'destination': '40677488-305b-41c1-83f0-d14c42d80c65',
    'isFavorite': true,
    'offers': [
      'e1510811-423b-4ac2-8364-86fc0a195745'
    ],
    'type': 'drive'
  },
  {
    'id': '7bac94eb-c9a1-44b1-ac75-5c350cbb4316',
    'basePrice': 4611,
    'dateFrom': '2026-04-19T06:02:04.805Z',
    'dateTo': '2026-04-20T00:51:04.805Z',
    'destination': '40677488-305b-41c1-83f0-d14c42d80c65',
    'isFavorite': true,
    'offers': [
      '17d940bf-26e5-41ac-a55d-c310bfb566f2',
      '3161709e-0149-43b0-8f64-31df0c36f751'
    ],
    'type': 'restaurant'
  },
  {
    'id': '139e4932-a201-44cd-ab89-84b8fe7957fe',
    'basePrice': 667,
    'dateFrom': '2026-04-21T01:33:04.805Z',
    'dateTo': '2026-04-21T17:48:04.805Z',
    'destination': '83ba8748-f59d-41d3-8f33-d37bf16fa438',
    'isFavorite': false,
    'offers': [
      '2f0c097a-515c-493d-87af-5716d0c59fdf',
      '4828f91e-8365-4cc5-b70b-5b47241b9137'
    ],
    'type': 'check-in'
  },
  {
    'id': '962341a2-3d98-451c-9fe7-210db490f45e',
    'basePrice': 7114,
    'dateFrom': '2026-04-22T06:10:04.805Z',
    'dateTo': '2026-04-23T05:11:04.805Z',
    'destination': '35a960a2-1ad0-4106-b20d-150caa1ae691',
    'isFavorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '077c440d-9e22-4ea7-b994-b3edf3315135',
    'basePrice': 6460,
    'dateFrom': '2026-04-25T03:58:04.805Z',
    'dateTo': '2026-04-25T19:06:04.805Z',
    'destination': '48097653-2f66-4b5e-acff-ab8077717c38',
    'isFavorite': true,
    'offers': [
      '72f5fbe9-eca3-4f04-bd01-86ca8627d8a8'
    ],
    'type': 'taxi'
  },
  {
    'id': 'a61f6700-324b-4282-9768-389d268f7f4c',
    'basePrice': 4152,
    'dateFrom': '2026-04-27T08:39:04.805Z',
    'dateTo': '2026-04-27T17:12:04.805Z',
    'destination': 'ce80978e-b63d-4264-92ce-4e4ec2856b48',
    'isFavorite': false,
    'offers': [
      'ea7648cd-633e-4cef-b63b-ffd9c539204a'
    ],
    'type': 'train'
  },
  {
    'id': '1608be0f-e26e-458f-9dec-71b221eb4737',
    'basePrice': 3427,
    'dateFrom': '2026-04-28T08:53:04.805Z',
    'dateTo': '2026-04-28T15:49:04.805Z',
    'destination': 'ab385db6-4fb4-4822-a9dc-747c6a32f41d',
    'isFavorite': true,
    'offers': [
      'ea7648cd-633e-4cef-b63b-ffd9c539204a'
    ],
    'type': 'train'
  }
];

export {
  eventsMock
};
