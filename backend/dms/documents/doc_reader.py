# coding=utf-8
# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
import pytesseract
import PyPDF2
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from PIL import Image
try:
    from PIL import Image
except ImportError:
    import Image


def stringFromDoc(imagePath):
    print("reading string ")
    result=""
    try:
        result=stringFromImage(imagePath)
    except Exception as e:
        print("Exception ----> in reading image ")
        print(e)
    result2=""
    try:
        result2=stringFromPdf(imagePath)
    except Exception as e:
        print("Exception ----> in reading result2 ")
        print(e)
    print("reading string "+result2)
    print("reading string "+result)
    finalResult=tokenizeThis(result)+tokenizeThis(result2)
    print("finalResult")
    print(finalResult)
    return finalResult

def tokenizeThis(result):
    #We'll create a new list that contains punctuation we wish to clean.
    punctuations = ['(',')',';',':','[',']',',']
    #We initialize the stopwords variable, which is a list of words like "The," "I," "and," etc. that don't hold much value as keywords.
    stop_words = stopwords.words('english')
    #We create a list comprehension that only returns a list of words that are NOT IN stop_words and NOT IN punctuations.
    tokens=result.split(" ")
    keywords = [word for word in tokens if not word in stop_words and not word in punctuations]
    print("keywords")
    return " ".join(line for line in keywords )
    # result="" if result is undefined

def stringFromImage(imagePath):
    result_string= pytesseract.image_to_string(Image.open(imagePath))
    lines = result_string.split("\n")
    return "".join([line for line in lines if line.strip() != ""])
def stringFromPdf(filename):
    pdfFileObj = open(filename,'rb')
    #The pdfReader variable is a readable object that will be parsed.
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    #Discerning the number of pages will allow us to parse through all the pages.
    num_pages = pdfReader.numPages
    count = 0
    text = ""
    #The while loop will read each page.
    while count < num_pages:
        pageObj = pdfReader.getPage(count)
        count +=1
        text += pageObj.extractText()
    #This if statement exists to check if the above library returned words. It's done because PyPDF2 cannot read scanned files.
    

    if text != "":
        text = text
    result=text.split('\n')
    print(text)
    finalResult="".join([line for line in result if line.strip() != ""])
    print("finalResult")
    print(finalResult)
    return finalResult
    # return text
def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print("Hi, {0}".format(name))  # Press ⌘F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    # print(pytesseract.image_to_string(Image.open('invoice-sample.jpg')))
    print(pytesseract.image_to_string(Image.open('check.jpg')))
    # img = Image.open("invoice-sample.jpg")
    # text = pytesseract.image_to_string(img)

    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
