import os
# import nltk
import nltk.corpus
from nltk.corpus import brown
from nltk.tokenize import word_tokenize
from nltk.tokenize import blankline_tokenize
from nltk.probability import FreqDist
from pathlib import Path
from nltk import bigrams, trigrams, ngrams
from nltk.stem import wordnet #dictionary
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import re
from nltk.text import Text
from nltk.stem import wordnet #dictionary
from nltk.stem import WordNetLemmatizer
from wordcloud import WordCloud
import matplotlib.pyplot as plt


if __name__=='__main__':
    # nltk.download()
    print(", ".join(brown.words()))
    hamlet=nltk.corpus.gutenberg.words("Shakespeare-hamlet.txt")
    print(hamlet)
    for word in hamlet[:500]:
        print(word, sep=' ', end=' ')


    # print(os.listdir(nltk.data.find('corpora')))
    # print(os.listdir(nltk.data))
    # print(nltk.data)
    # dir(nltk.corpus)
    # nltk.corpus.demo()
    # nltk.download('abc')
    # print(nltk.data.find('corpora'))
    # print('hello')
    print('hello')
    # hamlet_token=word_tokenize("This is going to be tough question? Learning is tough.")
    invest_text = Path('stock_recommend.txt').read_text()
    print(invest_text)
    invest_token = word_tokenize(invest_text)

    print(invest_token)
    print(len(invest_token))
    print(FreqDist(invest_token))
    freqDist=FreqDist()
    for word in invest_token:
        freqDist[word.lower()]+=1
    pass; freqDist=FreqDist()
    for word in invest_token:
        freqDist[word.lower()]+=1
    pass;
    print(freqDist.items())
    print(freqDist['tough'])
    print(len(freqDist))
    most_common_100=freqDist.most_common(1000)
    print(most_common_100) #Top 10

    paragraphs = blankline_tokenize(invest_text)
    print(len(paragraphs)) #paragraph seperated by blank line
    print(paragraphs[0]) #first paragraph
    print(paragraphs[4]) #fourth paragraph

    biggy=list(bigrams(invest_token))
    print(biggy)

    word_lem=WordNetLemmatizer()
    words=('Go','Goa','Gone','went','boys')
    for word in words:
        print(word_lem.lemmatize(word))

    # print(most_common_100)
    punct=re.compile(r'[.?,’\'&0-9:)(]')
    punct=re.compile(r'[.?,’\'&0-9:)(]')
    # punct=re.compile(r'[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]')print(string.punctuation)
    # punct=re.compile(r'[,]')
    # post_processing=[]
    # for words in invest_token:
    print(freqDist.most_common(100))
    english_stopwords=stopwords.words('english')
    freqDist=FreqDist()
    word_lem=WordNetLemmatizer()
    word_lem.lemmatize('corpora')
    print(english_stopwords)
    for words in invest_token:
        word=punct.sub("",words)

        if(len(word)>0 and not english_stopwords.__contains__(word.lower())):
            if word.lower()=="also":
                print('why')
            word=word_lem.lemmatize(word)
            freqDist[word.lower()]+=1
    print(freqDist.most_common(100))
    # print(stopwords.words('english'))
    # print(stopwords.words('japanese'))
    print(freqDist.most_common(10))
    most_common_str=[]
    for item in freqDist.most_common(10):
        most_common_str.append(item[0])
    # Text(invest_token).dispersion_plot(most_common_str)
    wcloud = WordCloud().generate_from_frequencies(dict(freqDist.most_common(100)))
    plt.imshow(wcloud, interpolation="bilinear")
    plt.axis("off")
    # (-0.5, 399.5, 199.5, -0.5)
    plt.show()
