import { Post } from "./components/post";

export const posts: Post[] = [
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/diego3g.png',
        name: 'Diego Fernandes',
        role: 'CTO @ Rocketseat'
      },
      content: [ 
        { type: 'paragraph', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In magni natus ad error! Quibusdam blanditiis quia.'  },
        { type: 'paragraph', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In magni natus ad error! Quibusdam blanditiis quia.'  },
        { type: 'link', content: 'jane.design/doctorcare ' },
      ],
      publishedAt: new Date('2023-05-03 18:55:00')
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayk Brito',
        role: 'Educator @ Rocketseat'
      },
      content: [ 
        { type: 'paragraph', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In magni natus ad error! Quibusdam blanditiis quia.'  },
        { type: 'paragraph', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In magni natus ad error! Quibusdam blanditiis quia.'  },
        { type: 'link', content: 'jane.design/doctorcare ' },
      ],
      publishedAt: new Date('2023-05-03 18:55:00')
    } 
  ]
