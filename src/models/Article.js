class Article {
  constructor(
    id,
    countView,
    hashtag,
    idCategory,
    idPenulis,
    imageUrl,
    judul,
    partOne,
    partTwo,
    partThree,
    time
  ) {
    this.id = id;
    this.countView = countView;
    this.hashtag = hashtag;
    this.idCategory = idCategory;
    this.idPenulis = idPenulis;
    this.imageUrl = imageUrl;
    this.judul = judul;
    this.partOne = partOne;
    this.partTwo = partTwo;
    this.partThree = partThree;
    this.time = time;
  }
}

export default Article;
