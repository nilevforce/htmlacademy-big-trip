const destinationsMock = [
  {
    'id': '09ee2e9d-d6b5-4277-a4cd-3268a0bf9bee',
    'description': 'Rotterdam - for those who value comfort and coziness',
    'name': 'Rotterdam',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/15.jpg',
        'description': 'Rotterdam in a middle of Europe'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/2.jpg',
        'description': 'Rotterdam for those who value comfort and coziness'
      }
    ]
  },
  {
    'id': '40677488-305b-41c1-83f0-d14c42d80c65',
    'description': 'Vien - in a middle of Europe',
    'name': 'Vien',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/8.jpg',
        'description': 'Vien famous for its crowded street markets with the best street food in Asia'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/16.jpg',
        'description': 'Vien with a beautiful old town'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/15.jpg',
        'description': 'Vien is a beautiful city'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/19.jpg',
        'description': 'Vien with an embankment of a mighty river as a centre of attraction'
      }
    ]
  },
  {
    'id': '83ba8748-f59d-41d3-8f33-d37bf16fa438',
    'description': 'Helsinki - with an embankment of a mighty river as a centre of attraction',
    'name': 'Helsinki',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/14.jpg',
        'description': 'Helsinki with crowded streets'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/7.jpg',
        'description': 'Helsinki middle-eastern paradise'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/7.jpg',
        'description': 'Helsinki famous for its crowded street markets with the best street food in Asia'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/5.jpg',
        'description': 'Helsinki famous for its crowded street markets with the best street food in Asia'
      }
    ]
  },
  {
    'id': 'ab385db6-4fb4-4822-a9dc-747c6a32f41d',
    'description': 'Milan - a true asian pearl',
    'name': 'Milan',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/4.jpg',
        'description': 'Milan middle-eastern paradise'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/1.jpg',
        'description': 'Milan in a middle of Europe'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/20.jpg',
        'description': 'Milan is a beautiful city'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/12.jpg',
        'description': 'Milan a true asian pearl'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/16.jpg',
        'description': 'Milan a perfect place to stay with a family'
      }
    ]
  },
  {
    'id': '48097653-2f66-4b5e-acff-ab8077717c38',
    'description': 'Hiroshima - a true asian pearl',
    'name': 'Hiroshima',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/7.jpg',
        'description': 'Hiroshima is a beautiful city'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/4.jpg',
        'description': 'Hiroshima with a beautiful old town'
      }
    ]
  },
  {
    'id': 'ce80978e-b63d-4264-92ce-4e4ec2856b48',
    'description': 'Rome - with a beautiful old town',
    'name': 'Rome',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/4.jpg',
        'description': 'Rome is a beautiful city'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/16.jpg',
        'description': 'Rome with an embankment of a mighty river as a centre of attraction'
      }
    ]
  },
  {
    'id': 'bb93c9d6-da47-4c50-8305-8809c05cf9c2',
    'description': 'Chamonix - in a middle of Europe',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/20.jpg',
        'description': 'Chamonix a true asian pearl'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/9.jpg',
        'description': 'Chamonix with a beautiful old town'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/4.jpg',
        'description': 'Chamonix with a beautiful old town'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/17.jpg',
        'description': 'Chamonix is a beautiful city'
      }
    ]
  },
  {
    'id': '35a960a2-1ad0-4106-b20d-150caa1ae691',
    'description': '',
    'name': 'Den Haag',
    'pictures': []
  },
  {
    'id': 'b1d782b5-fb18-41a8-a634-cb92cf5940f1',
    'description': '',
    'name': 'Kioto',
    'pictures': []
  },
  {
    'id': 'a536618b-a871-4beb-90e3-1aebc67b2c09',
    'description': 'Amsterdam - a perfect place to stay with a family',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/9.jpg',
        'description': 'Amsterdam middle-eastern paradise'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/16.jpg',
        'description': 'Amsterdam in a middle of Europe'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/1.jpg',
        'description': 'Amsterdam with crowded streets'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/17.jpg',
        'description': 'Amsterdam a perfect place to stay with a family'
      },
      {
        'src': 'https://24.objects.htmlacademy.pro/static/destinations/18.jpg',
        'description': 'Amsterdam a true asian pearl'
      }
    ]
  }
];

export {
  destinationsMock
};
