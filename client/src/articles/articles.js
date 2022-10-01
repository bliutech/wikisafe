function articles(name) {
  switch(name) {

    case "ucla":
      return `
# University of California, Los Angeles

![UCLA Royce Hall](https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg)
<figcaption>UCLA Royce Hall, the oldest building of the university.</figcaption>

The University of California, Los Angeles (UCLA) is a public land-grant research university in Los Angeles, California. UCLA's academic roots were established in 1881 as a teachers college then known as the southern branch of the California State Normal School (now San José State University). This school was absorbed with the official founding of UCLA as the Southern Branch of the University of California in 1919, making it the second-oldest of the 10-campus University of California system (after UC Berkeley).

## Campus

The new UCLA campus in 1929 had four buildings: Royce Hall and Haines Hall on the north, and Powell Library and Kinsey Hall (now called Renee And David Kaplan Hall) on the south. The Janss Steps were the original 87-step entrance to the university that lead to the quad of these four buildings. Today, the campus includes 163 buildings across 419 acres (1.7 km<sup>2</sup>) in the western part of Los Angeles, north of the Westwood shopping district and just south of Sunset Boulevard. In terms of acreage, it is the second-smallest of the ten UC campuses. The campus is approximately 1 mile east of I-405 (the San Diego Freeway).

**Source**: [*Wikipedia*](https://en.wikipedia.org/wiki/University_of_California,_Los_Angeles)

### Miscellaneous

\`\`\`
print("Hello, World!")
\`\`\`

1. Peanut
2. Butter
3. Jelly
4. Jsandwich

| Peanut  | Butter | Jelly   | Jsandwich |
| ------- | ------ | ------- | --------- |
| Prateik | Benson | Jeffrey | Jordan    |

**Text** of *all*&mdash;varieties! Make sure to drink lots of H<sub>2</sub>O :) Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      `;

    case "mit":
      return `
# Massachusetts Institute of Technology

![MIT Great Dome](https://news.mit.edu/sites/default/files/download/201810/MIT-Computer-Announce-01-PRESS.jpg)
<figcaption> MIT Great Dome, a famous building on campus.</figcaption>

The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. Established in 1861, MIT has since played a key role in the development of modern technology and science, ranking among the top academic institutions in the world.

## Campus

MIT's 166-acre (67.2 ha) campus in the city of Cambridge spans approximately a mile along the north side of the Charles River basin. The campus is divided roughly in half by Massachusetts Avenue, with most dormitories and student life facilities to the west and most academic buildings to the east. The bridge closest to MIT is the Harvard Bridge, which is known for being marked off in a non-standard unit of length &ndash; the smoot.
      `;
    }
}


export { articles };