let question = new Array();
let qnum;
let options = new Array();
let selected;
let score = 0,
  mode = 0,
  type = 0,
  keyFlag = 0;
let modeSelector, typeSelector;
function setup() {
  noLoop();
  modeSelector = createSlider(0, 1, 0, 1);
  typeSelector = createSelect();
  typeSelector.option("One Word Substitutions", 1);
  typeSelector.option("antonyms", 2);
  questionSetup();
}

function draw() {}
class Question {
  constructor(q, ans) {
    this.q = q;
    this.ans = ans.trim();
  }
}
function GUIsetup() {
  document.documentElement.innerHTML = "";
  document.body.style.backgroundColor = "#222222";
  document.body.style.color = "#00aadd";
  let highScore = 0;
  createSpan("Score:" + score).position(300, 20, "relative");
  createSpan("MCQ").position(0, 50, "relative");
  modeSelector = createSlider(0, 1, mode, 1).position(0, 52, "relative");
  modeSelector.style("width:30px");
  createSpan("Spell").position(0, 50, "relative");

  typeSelector = createSelect().position(150, 50, "relative");
  typeSelector.option("One Word Substitutions", 1);
  typeSelector.option("Antonyms", 2);
  typeSelector.option("Idioms", 3);
  typeSelector.selected(type);
  ques = createP(question[qnum].q).position(50, 70, "relative");
  ques.style("font-size:22px");
  if (mode == 0) {
    selected = createRadio().position(50, 100, "relative");
    selected.option(options[0]);
    selected.option(options[1]);
    selected.option(options[2]);
    selected.option(options[3]);
    selected.style("display:flex");
    selected.style("flex-direction:column");
    selected.style("font-size:22px");
    switch (type) {
      case "1":
        if (localStorage.getItem("high_score_oneWord_MCQ") == null)
          localStorage.setItem("high_score_oneWord_MCQ", 0);
        highScore = localStorage.getItem("high_score_oneWord_MCQ");
        break;
      case "2":
        if (localStorage.getItem("high_score_antonyms_MCQ") == null)
          localStorage.setItem("high_score_antonyms_MCQ", 0);
        highScore = localStorage.getItem("high_score_antonyms_MCQ");
        break;
      case "3":
        if (localStorage.getItem("high_score_idioms_MCQ") == null)
          localStorage.setItem("high_score_idioms_MCQ", 0);
        highScore = localStorage.getItem("high_score_idioms_MCQ");
        break;
    }
  }
  if (mode == 1) {
    answer = createInput("", "text").position(50, 200, "relative");
    answer.size(150, 30);
    switch (type) {
      case "1":
        if (localStorage.getItem("high_score_oneWord_spell") == null)
          localStorage.setItem("high_score_oneWord_spell", 0);
        highScore = localStorage.getItem("high_score_oneWord_spell");
        break;
      case "2":
        if (localStorage.getItem("high_score_antonyms_spell") == null)
          localStorage.setItem("high_score_antonyms_spell", 0);
        highScore = localStorage.getItem("high_score_antonyms_spell");
        break;
      case "3":
        if (localStorage.getItem("high_score_idioms_spell") == null)
          localStorage.setItem("high_score_idioms_spell", 0);
        highScore = localStorage.getItem("high_score_idioms_spell");
        break;
    }
  }
  createSpan("High Score:" + highScore).position(50, 20, "absolute");
  check = document.createElement("button");
  document.body.appendChild(check);
  check.onclick = function () {
    checkAnswer();
  };
  check.innerHTML = "Check";
  check.style.width = "80px";
  check.style.height = "40px";
  check.style.fontSize = "18px";
  check.style.position = "relative";
  check.style.top = "200px";
  check.style.left = "50px";
}
function questionSetup() {
  if (mode != modeSelector.value() || type != typeSelector.value()) {
    switch (type) {
      case "1":
        if (mode == 0) localStorage.setItem("high_score_oneWord_MCQ", score);
        if (mode == 1) localStorage.setItem("high_score_oneWord_spell", score);
        break;
      case "2":
        if (mode == 0) localStorage.setItem("high_score_antonyms_MCQ", score);
        if (mode == 1) localStorage.setItem("high_score_antonyms_spell", score);
        break;
      case "3":
        if (mode == 0) localStorage.setItem("high_score_idioms_MCQ", score);
        if (mode == 1) localStorage.setItem("high_score_idioms_spell", score);
        break;
    }
    score = 0;
  }
  mode = modeSelector.value();
  type = typeSelector.value();
  switch (type) {
    case "1":
      rangeStart = 0;
      rangeEnd = 143.5;
      break;
    case "2":
      rangeStart = 144;
      rangeEnd = 213.5;
      break;
    case "3":
      rangeStart = 214;
      rangeEnd = 256.5;
  }
  qnum = parseInt(random(rangeStart, rangeEnd));
  if (mode == 0) {
    do {
      n = parseInt(random(rangeStart, rangeEnd));
    } while (n == qnum);
    do {
      m = parseInt(random(rangeStart, rangeEnd));
    } while (m == qnum || m == n);
    do {
      l = parseInt(random(rangeStart, rangeEnd));
    } while (l == qnum || l == m || l == n);
    do {
      k = parseInt(random(rangeStart, rangeEnd));
    } while (k == qnum || k == m || k == n || k == l);
    options[0] = question[k].ans;
    options[1] = question[l].ans;
    options[2] = question[m].ans;
    options[3] = question[n].ans;
    options[parseInt(random(0, 3))] = question[qnum].ans;
  }
  GUIsetup();
}
function checkAnswer() {
  next = createButton("Next");
  next.position(-30, 200, "relative");
  next.style("width:80px");
  next.style("height:40px");
  next.style("font-size:20px");
  next.mousePressed(questionSetup);
  if (mode == 0) {
    if (selected.value() == question[qnum].ans) {
      createSpan("Correct").position(-110, 250, "relative");
      score++;
    } else {
      createSpan("Wrong").position(200, 100, "absolute");
      createSpan("Correct Answer:" + question[qnum].ans).position(
        0,
        250,
        "relative"
      ).style("textAlign:middle");
      switch (type) {
        case "1":
          localStorage.setItem("high_score_oneWord_MCQ", score);
          break;
        case "2":
          localStorage.setItem("high_score_antonyms_MCQ", score);
          break;
        case "2":
          localStorage.setItem("high_score_idioms_MCQ", score);
          break;
      }
      score = 0;
    }
  }
  if (mode == 1) {
    if (
      answer.value().trim().toUpperCase() === question[qnum].ans.toUpperCase()
    ) {
      createSpan("Correct").position(200, 70);
      score++;
    } else {
      createSpan("Wrong").position(200, 70);
      createSpan("Correct Answer:" + question[qnum].ans).position(50, 400);
      switch (type) {
        case "1":
          localStorage.setItem("high_score_oneWord_spell", score);
          break;
        case "2":
          localStorage.setItem("high_score_antonyms_spell", score);
          break;
        case "2":
          localStorage.setItem("high_score_idioms_spell", score);
          break;
      }
      score = 0;
    }
  }
  check.style.visibility = "hidden";
}
function preload() {
  question.push(new Question("1. A woman who is unmarried ", " Spinster"));
  question.push(new Question("2. A man who is unmarried ", " Bachelor"));
  question.push(
    new Question("3. Festival of hundredth anniversary ", " Centenary")
  );
  question.push(new Question("4. A man who is fond of fishing ", " Angler"));
  question.push(new Question("5. One who does not eat meat ", " Vegetarian"));
  question.push(new Question("6. That which can not be tamed ", " Wild"));
  question.push(new Question("7. An assembly of listeners ", " Audience"));
  question.push(new Question("8. Murder of one's brother ", " Fratricide"));
  question.push(new Question("9. Murder of one's sister ", " Sororicide"));
  question.push(new Question("10. Murder of one's mother ", " Matricide"));
  question.push(new Question("11. Murder of one's father ", " Patricide"));
  question.push(
    new Question(
      "12. People working together in the same office or department ",
      " Colleagues"
    )
  );
  question.push(new Question("13. Speaking of two languages .", " Bilingual"));
  question.push(new Question("14. Speaking of one language .", " Monolingual"));
  question.push(
    new Question("15. Speaking of three languages .", " Trilingual")
  );
  question.push(new Question("16. Capable to heard .", " Audible"));
  question.push(
    new Question("17. A post for which no salary is paid .", " Honorary")
  );
  question.push(
    new Question("18. A disease which spreads all over the area .", " Epidemic")
  );
  question.push(
    new Question("19. A man who talks too much about himself .", " Egotist")
  );
  question.push(
    new Question("20. A speech delivered without preparation .", " Extempore")
  );
  question.push(new Question("21. A lover of books .", " Bibliophile"));
  question.push(new Question("22. That may cause death .", " Fatal"));
  question.push(new Question("23. Absence of the governance .", " Anarchy"));
  question.push(
    new Question("24. A man who draws comic picture .", " Cartoonist")
  );
  question.push(
    new Question(
      "25. Words written on the tombstone after one's death .",
      " Epitaph"
    )
  );
  question.push(
    new Question("26. That which can be broken easily into pieces .", "Brittle")
  );
  question.push(new Question("27. That is contrary to law .", " Illegal"));
  question.push(
    new Question("28. One who totally abstains from liquor .", " Teetotaler")
  );
  question.push(
    new Question("29. Ruler who has absolute authority .", " Dictator")
  );
  question.push(new Question("30. That can not be conquered .", " Invincible"));
  question.push(new Question("31. That is no longer in use .", " Obsolete"));
  question.push(new Question("32. That can not be imitated .", " Inimitable"));
  question.push(
    new Question(
      "33. A person who leaves his country and settled in another .",
      " Emigrant"
    )
  );
  question.push(
    new Question("34. A person who indifferent from please or pain .", " Stoic")
  );
  question.push(
    new Question("35. A medicine that kills germs .", " Antibiotic")
  );
  question.push(
    new Question("36. A disease which spreads by contact .", " Contagious")
  );
  question.push(
    new Question("37. The science of flying aeroplane .", " Aeronautics")
  );
  question.push(
    new Question("38. A place where dead bodies are kept .", " Mortuary")
  );
  question.push(
    new Question("39. Incapable of being dividend .", " Indivisible")
  );
  question.push(new Question("40. Of one mind or opinion .", " Unanimous"));
  question.push(
    new Question(
      "41. An enclosure for breeding nursing and keeping of birds .",
      " Aviculture"
    )
  );
  question.push(
    new Question(
      "42. Items of business to be considered at a meeting .",
      " Agenda"
    )
  );
  question.push(
    new Question("43. An imaginary name assumed by an author .", " Pen name")
  );
  question.push(
    new Question("44. Habit of walking in sleep .", " Sleepwalking")
  );
  question.push(
    new Question("45. A person widely known for evil deeds .", " Notorious")
  );
  question.push(
    new Question(
      "46. Allow once due to a wife from her husband on separation .",
      " Alimony"
    )
  );
  question.push(
    new Question(
      "47. A type of work or way of life that you believe is especially suitable for you .",
      " Vocation"
    )
  );
  question.push(
    new Question("48. A man who is womanish in habits .", " Effeminate")
  );
  question.push(
    new Question(
      "49. Person who is caused to suffer of a great cause .",
      " Martyr"
    )
  );
  question.push(
    new Question("50. Not liable to mistake or error .", " Infallible")
  );
  question.push(new Question("51. That can be removed .", " Indelible"));
  question.push(
    new Question("52. The state of being unmarried .", " Celibacy")
  );
  question.push(
    new Question(
      "53. A letter which does not bear the name of writer .",
      " Anonymous"
    )
  );
  question.push(new Question("54. Working for money .", " Mercenary"));
  question.push(
    new Question("55. Piece of land surrounded by water .", " Island")
  );
  question.push(
    new Question("56. Who is unable to pay debts .", " Bankrupt /Insolvent")
  );
  question.push(
    new Question("57. Birth after the death of father .", " Posthumous")
  );
  question.push(new Question("58. Hand written matter .", " Manuscript"));
  question.push(
    new Question(
      "59. The life history of a man written by himself .",
      " Autobiography"
    )
  );
  question.push(
    new Question("60. A person who believes that there is no God .", " Atheist")
  );
  question.push(
    new Question(
      "61. Government by a ruler who has unlimited power .",
      " Autocracy"
    )
  );
  question.push(new Question("62. A traveller in space .", " Astronaut"));
  question.push(new Question("63. An assembly of listeners .", " Audience"));
  question.push(
    new Question(
      "64. A medicine which prevents infection by killing germs .",
      " Antiseptic"
    )
  );
  question.push(new Question("65. To give up the throne .", " Abdicate"));
  question.push(new Question("66. The science of vegetable life .", " Botany"));
  question.push(
    new Question("67. The science of which treats of life .", " Biology")
  );
  question.push(
    new Question("68. Government by the officials .", " Bureaucracy")
  );
  question.push(
    new Question(
      "69. The life history of a man written by someone else .",
      " Biography"
    )
  );
  question.push(new Question("70. A man who eats human flesh .", " Cannibal"));
  question.push(
    new Question(
      "71. A place for burials other than a churchyard .",
      " cemetery"
    )
  );
  question.push(
    new Question("72. A place for cremation of dead bodies .", " Crematorium")
  );
  question.push(
    new Question("73. That is free from national prejudices .", " Cosmopolitan")
  );
  question.push(
    new Question(
      "74. Substance designed to make the skin or hair more beautiful .",
      " Cosmetics"
    )
  );
  question.push(new Question("75. That can be believed .", " Credible"));
  question.push(
    new Question("76. The artist who draws comic picture .", " Caricaturist")
  );
  question.push(
    new Question(
      "77. A government of the people, by the people and for the people .",
      " Democracy"
    )
  );
  question.push(
    new Question(
      "78. A battle or a match in which neither party wins .",
      " Drawn"
    )
  );
  question.push(new Question("79. Want of rain .", " Drought"));
  question.push(
    new Question("80. A disease which spreads over a large area .", " Epidemic")
  );
  question.push(
    new Question("81. Articles sent from one country to another .", " Export")
  );
  question.push(new Question("82. That is fit to be eaten .", " Edible"));
  question.push(
    new Question(
      "83. A selfish person who always thinks of himself .",
      " Egotist"
    )
  );
  question.push(new Question("84. Fit to be chosen .", " Eligible"));
  question.push(
    new Question(
      "85. A person who leaves his own country and goes to live in another .",
      " Emigrant"
    )
  );
  question.push(
    new Question("86. Spoken without previous preparation .", " Extempore")
  );
  question.push(new Question("87. Words inscribed on graves .", " Epitaph"));
  question.push(new Question("88. One who believes in fate .", " fatalist"));
  question.push(
    new Question(
      "89. A man residing in a country of which he is not a citizen .",
      " Foreigner"
    )
  );
  question.push(
    new Question("90. A medicine for killing germs .", " Germicide")
  );
  question.push(new Question("91. A person who eats too much .", " Glutton"));
  question.push(
    new Question(
      "92. Killing of human being specially by another .",
      " Homicide"
    )
  );
  question.push(new Question("93. That can not be read .", " Illegible"));
  question.push(
    new Question(
      "94. A person who comes to one country from another in order to settle there .",
      " Immigrant"
    )
  );
  question.push(
    new Question("95. That is difficult to believe .", " Incredible")
  );
  question.push(new Question("96. That cannot be conquered .", " Invincible"));
  question.push(
    new Question("97. Who can neither read nor write .", " Illiterate")
  );
  question.push(
    new Question("98. The killing of a new born child .", " Infanticide")
  );
  question.push(new Question("99. That can not be repaired .", " Irreparable"));
  question.push(new Question("100. That can not be removed .", " Indelible"));
  question.push(new Question("101. That is contrary to law .", " Illegal"));
  question.push(
    new Question("102. Capable to catch fire easily .", " Inflammable")
  );
  question.push(new Question("103. Who lacks knowledge .", " Uneducated"));
  question.push(
    new Question("104. One who knows many languages .", " Linguist")
  );
  question.push(
    new Question(
      "105. A room or building used for scientific experiments .",
      " Laboratory"
    )
  );
  question.push(
    new Question(
      "106. An established principle of practical wisdom .",
      " maxim"
    )
  );
  question.push(
    new Question(
      "107. A place where dead bodies are kept before post-mortem .",
      " Mortuary"
    )
  );
  question.push(
    new Question("108. A person who hates mankind .", " Misanthropist")
  );
  question.push(
    new Question("109. Widely known for bad works .", " Notorious")
  );
  question.push(
    new Question("110. A person who eats meat .", " Non vegetarian")
  );
  question.push(new Question("111. Which is no longer in use .", " Obsolete"));
  question.push(new Question("112. That is not wide .", " Narrow"));
  question.push(
    new Question(
      "113. A person who looks at the bright side of things .",
      " Optimist"
    )
  );
  question.push(
    new Question("114. A child whose parents are dead .", " Orphan")
  );
  question.push(new Question("115. All powerful .", " Omnipotent"));
  question.push(new Question("116. A garden of fruits .", " Orchard"));
  question.push(
    new Question(
      "117. Holding conventional beliefs in matter of religion .",
      " Orthodox"
    )
  );
  question.push(new Question("118. That can be seen through .", " Opaque"));
  question.push(
    new Question("119. Who is present everywhere .", " Omnipresent")
  );
  question.push(new Question("120. Who knows everything .", " Omniscient"));
  question.push(
    new Question("121. Medical examination of dead body .", " Post mortem ")
  );
  question.push(
    new Question(
      "122. A person who looks at the dark side of things .",
      " Pessimist "
    )
  );
  question.push(
    new Question("123. A remedy for all kinds of diseases .", " Panacea")
  );
  question.push(new Question("124. One who lives on another .", " Parasite "));
  question.push(new Question("125. A lover of mankind .", " Philanthropist "));
  question.push(
    new Question("126. One who goes on a journey to a holy place .", " Pilgrim")
  );
  question.push(
    new Question(
      "127. One who has a great love for one's country .",
      " Patriot"
    )
  );
  question.push(new Question("128. One who goes on foot .", " Pedestrian "));
  question.push(
    new Question("129. One who lives alone and avoid people .", " Recluse ")
  );
  question.push(new Question("130. Killing of one's ownself .", " Suicide "));
  question.push(
    new Question("131. One who speaks on behalf of others .", " Spokesman ")
  );
  question.push(new Question("132. Which is not fresh .", " Stale"));
  question.push(
    new Question("133. Person who believes that there is God .", " Theist ")
  );
  question.push(
    new Question("134. That can be seen through .", " Transparent ")
  );
  question.push(
    new Question("135. That is difficult to believe .", " Unbelievable ")
  );
  question.push(
    new Question(
      "136. One who lives wholly on vegetable food .",
      " Vegetarian "
    )
  );
  question.push(
    new Question(
      "137. A person who lends money at a very high rate of interest .",
      " Usurer"
    )
  );
  question.push(
    new Question("138. A person who has long experience .", " Veteran ")
  );
  question.push(
    new Question("139. Acting of one's own free will .", " Voluntary ")
  );
  question.push(
    new Question("140. A place where clothes are kept .", " Wardrobe ")
  );
  question.push(new Question("141. That can not be tamed .", " Wild "));
  question.push(new Question("142. A woman whose husband is dead .", " Widow"));
  question.push(new Question("143. A man whose wife is dead .", " Widower "));
  question.push(
    new Question("144. A place where birds, animals etc. are kept .", " Zoo")
  );
  question.push(new Question("above", "below"));
  question.push(new Question("attack", "defend"));
  question.push(new Question("ability", "inability"));
  question.push(new Question("adversity", "prosperity"));
  question.push(new Question("ancient", "modern"));
  question.push(new Question("accurate", "inaccurate"));
  question.push(new Question("ample", "meagre"));
  question.push(new Question("advantage", "disadvantage"));
  question.push(new Question("agree", "disagree"));
  question.push(new Question("angle", "devil"));
  question.push(new Question("bottom", "top"));
  question.push(new Question("blunt", "sharp"));
  question.push(new Question("busy", "idle"));
  question.push(new Question("bessing", "curse"));
  question.push(new Question("brave", "coward"));
  question.push(new Question("barren", "fertile"));
  question.push(new Question("boon", "bane"));
  question.push(new Question("concord", "discord"));
  question.push(new Question("complicated", "simple"));
  question.push(new Question("creation", "destruction"));
  question.push(new Question("confidance", "diffidance"));
  question.push(new Question("credit", "debit"));
  question.push(new Question("courageous", "timid"));
  question.push(new Question("converge", "diverge"));
  question.push(new Question("docile", "stubborn"));
  question.push(new Question("dull", "intelligent"));
  question.push(new Question("domestic", "wild"));
  question.push(new Question("diposit", "withdraw"));
  question.push(new Question("demand", "supply"));
  question.push(new Question("defeat", "victory"));
  question.push(new Question("desolate", "inhabited"));
  question.push(new Question("distant", "near"));
  question.push(new Question("distress", "comfort"));
  question.push(new Question("exterior", "interior"));
  question.push(new Question("examiner", "examinee"));
  question.push(new Question("expedite", "delay"));
  question.push(new Question("faliure", "success"));
  question.push(new Question("fierce", "gentle"));
  question.push(new Question("guest", "host"));
  question.push(new Question("gallent", "coward"));
  question.push(new Question("grateful", "ungreateful"));
  question.push(new Question("heaven", "hell"));
  question.push(new Question("humble", "proud"));
  question.push(new Question("honest", "dishonest"));
  question.push(new Question("import", "export"));
  question.push(new Question("include", "exclude"));
  question.push(new Question("increase", "decrease"));
  question.push(new Question("innocent", "guilty"));
  question.push(new Question("intial", "final"));
  question.push(new Question("justice", "injustice"));
  question.push(new Question("junior", "senior"));
  question.push(new Question("knowledge", "ignorance"));
  question.push(new Question("litterate", "illiterate"));
  question.push(new Question("legitimate", "illegitimate"));
  question.push(new Question("lend", "borrow"));
  question.push(new Question("make", "mar"));
  question.push(new Question("legal", "illegal"));
  question.push(new Question("merit", "demerit"));
  question.push(new Question("miser", "spendthrift"));
  question.push(new Question("obtain", "lose"));
  question.push(new Question("oral", "written"));
  question.push(new Question("ordinary", "extraoridnary"));
  question.push(new Question("pain", "pleasure"));
  question.push(new Question("patriot", "traitor"));
  question.push(new Question("praise", "blame"));
  question.push(new Question("pure", "impure"));
  question.push(new Question("regular", "irregular"));
  question.push(new Question("sacred", "profane"));
  question.push(new Question("sweet", "sour"));
  question.push(new Question("visible", "invisible"));
  question.push(
    new Question(
      "A Blessing in Disguise",
      " A good thing that initially seemed bad"
    )
  );

  question.push(
    new Question("A Dime a Dozen", " Something that is very common, not unique")
  );

  question.push(
    new Question(
      "Adding Insult to Injury",
      " To make a bad situation even worse"
    )
  );

  question.push(
    new Question(
      "Beat Around the Bush",
      " Avoid sharing your true viewpoint or feelings because it is uncomfortable"
    )
  );

  question.push(
    new Question(
      "Beating a Dead Horse",
      " Giving time or energy to something that is ended or over"
    )
  );

  question.push(
    new Question(
      "Bite the Bullet",
      " To get an unfavorable situation or chore over with now because it will need to get finished eventually"
    )
  );

  question.push(
    new Question(
      "Best of Both Worlds",
      " The choice or solution has all of the advantages of two contrasting things at the same time"
    )
  );

  question.push(
    new Question(
      "Biting Off More Than You Can Chew",
      " Not having the capacity to take on a new assignment or task that is just too taxing"
    )
  );

  question.push(
    new Question("By the Skin of Your Teeth", " Just barely making it")
  );

  question.push(
    new Question(
      "Don’t Judge a Book by Its Cover",
      " Not judging something by its initial appearance"
    )
  );

  question.push(
    new Question(
      "Doing Something at the Drop of a Hat",
      " Doing something at the moment of being asked"
    )
  );

  question.push(
    new Question(
      "Don’t Count Your Chickens Before They Hatch",
      " Not to count on something happening until after it’s already happened"
    )
  );

  question.push(
    new Question(
      "Caught Between a Rock and a Hard Place",
      " Making a choice between two unpleasant choices"
    )
  );

  question.push(
    new Question(
      "Costs an Arm and a Leg",
      " Something that is overpriced or very expensive"
    )
  );

  question.push(
    new Question(
      "Cutting Corners",
      " Not performing a task or duty correctly in order to save time or money"
    )
  );

  question.push(
    new Question(
      "Devil’s Advocate",
      " To take the side of the counter-argument, or offer an alternative point of view"
    )
  );

  question.push(
    new Question(
      "Feeling Under the Weather",
      " Not feeling well, or feeling sick"
    )
  );

  question.push(new Question("Fit as a Fiddle", " Being in good health"));

  question.push(
    new Question(
      "Getting a Taste of Your Own Medicine",
      " Being treated the way that you have been treating others"
    )
  );

  question.push(
    new Question(
      "Getting a Second Wind",
      " Having energy again after being tired"
    )
  );

  question.push(
    new Question(
      "Giving the Benefit of the Doubt",
      " Believing someone’s story without proof even though it may seem unbelievable"
    )
  );

  question.push(
    new Question("Giving Someone the Cold Shoulder", " Ignoring someone")
  );

  question.push(
    new Question(
      "Going on a Wild Goose Chase",
      " Doing something that is pointless"
    )
  );

  question.push(
    new Question(
      "Heard it on the Grapevine",
      " Hearing rumours about someone or something"
    )
  );

  question.push(
    new Question(
      "Hitting the Nail on the Head",
      " Performing a task with exactness"
    )
  );

  question.push(
    new Question(
      "Killing Two Birds With One Stone",
      " Accomplishing two different tasks in the same undertaking"
    )
  );

  question.push(
    new Question(
      "Letting Someone Off the Hook",
      " Not holding someone responsible for something"
    )
  );

  question.push(
    new Question(
      "Letting the Cat Out of the Bag",
      " Sharing information that was intended to be a secret"
    )
  );

  question.push(
    new Question(
      "No Pain, No Gain",
      " You have to work hard in order to see results"
    )
  );

  question.push(
    new Question(
      "On the Ball",
      " Doing a good job, being prompt, or being responsible"
    )
  );

  question.push(
    new Question(
      "Once in a Blue Moon",
      " Something that doesn’t happen very often"
    )
  );

  question.push(
    new Question("Piece of Cake", " A task or job that is easy to complete")
  );

  question.push(new Question("Pulling Someone’s Leg", " Joking with someone"));

  question.push(
    new Question(
      "Speak of the Devil",
      " When the person you have just been talking about arrives"
    )
  );

  question.push(
    new Question(
      "Stealing Someone’s Thunder",
      " Taking credit for someone else’s achievements"
    )
  );

  question.push(
    new Question(
      "Straight from the Horse’s Mouth",
      " Reading or hearing something from the source"
    )
  );

  question.push(
    new Question(
      "The Last Straw",
      " The last difficulty or annoyance that makes the entire situation unbearable"
    )
  );

  question.push(
    new Question(
      "The Elephant in the Room",
      " An issue, person, or problem that someone is trying to avoid"
    )
  );

  question.push(
    new Question(
      "Throwing Caution to the Wind",
      " Being reckless or taking a risk"
    )
  );

  question.push(
    new Question("Your Guess is as Good as Mine", " To not know something")
  );

  question.push(
    new Question(
      "Can’t Make an Omelette Without Breaking Some Eggs",
      " You can’t make everyone happy"
    )
  );

  question.push(
    new Question(
      "You Can Lead a Horse to Water, but You Can’t Make Him Drink",
      " You can’t force someone to make what is seemingly the right decision"
    )
  );

  question.push(
    new Question("Clouds on the Horizon", " Trouble is coming or is on its way")
  );
}
