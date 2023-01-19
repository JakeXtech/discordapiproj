import sys
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.relative_locator import locate_with
from dotenv import load_dotenv
load_dotenv()


# Initialize the browser instance
# path_to_chromedriver = 'C:/Users/mrthe/bootcamp/pydiscordbrowser/chromedriver.exe'
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
options = webdriver.ChromeOptions()
options.add_argument('--headless=False')
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
options.add_argument('--ignore-certificate-errors-spki-list')
options.add_argument('log-level=3')
options.add_argument('--disable-notifications')

# Navigate to Discord
driver.get('https://discord.com/login')
time.sleep(2)

# Find the email and password fields and fill 'em in
time.sleep(2)
dlEMAIL = os.getenv('dlEMAIL')
dlPASSWORD = os.getenv('dlPASSWORD')

jxEMAIL = os.getenv('jxEMAIL')
jxPASSWORD = os.getenv('jxPASSWORD')

jxPyEMAIL = os.getenv('jxPyEMAIL')
jxPyPASSWORD = os.getenv('jxPyPASSWORD')

email_field = driver.find_element(By.NAME, 'email')
email_field.send_keys(jxPyEMAIL)
password_field = driver.find_element(By.NAME, 'password')
password_field.send_keys(jxPyPASSWORD)


# Find the login button on the login form and click it
time.sleep(1)
loginButton = driver.find_element(locate_with(By.TAG_NAME, "div").above({
    By.CLASS_NAME: "needAccount-MrvMN7"}).below({By.CLASS_NAME: "contents-3ca1mk"}))
loginButton.click()
print("##### Made it through login process")
sys.stdout.flush()


# Navigate to server and channel via URL
time.sleep(5)
driver.get("https://discord.com/channels/1063538236900782220/1063538236900782223")
print("##### Made it to the proper channel in the DL server")
sys.stdout.flush()

# Post in the channel
time.sleep(3)
# Get the active element
active_element = driver.execute_script("return document.activeElement")
print("##### got active element via script execution")
sys.stdout.flush()
time.sleep(3)
# Print the element to the console
print(active_element.get_attribute("outerHTML"))
print("#### printed active element to console")
sys.stdout.flush()
time.sleep(3)

# Send input to the active element

print("##### made it to first prompts variables blocks")
sys.stdout.flush()
text1 = "test output 1"
text2 = "test output 2"
text3 = "test output 3"

data_to_send_back = "Message from python script: Hello."
print("##### made it to commented out inputs/outputs")
# sys.stdout.flush()
# input = sys.argv[1]
# output = data_to_send_back
# print(output)

sys.stdout.flush()
print("##### made it to the send_keys list")
sys.stdout.flush()
active_element.send_keys(text1)
time.sleep(300/1000)
active_element.send_keys(Keys.SPACE)
time.sleep(300/1000)
active_element.send_keys(Keys.ENTER)
time.sleep(2)
active_element.send_keys("/")
time.sleep(1)
active_element.send_keys("i")
time.sleep(1)
active_element.send_keys(Keys.ENTER)
time.sleep(3)
active_element.send_keys(text2)
time.sleep(300/1000)
active_element.send_keys(Keys.SPACE)
time.sleep(300/1000)
active_element.send_keys(Keys.ENTER)
time.sleep(3)
active_element.send_keys("/")
time.sleep(1)
active_element.send_keys("i")
time.sleep(1)
active_element.send_keys(Keys.ENTER)
time.sleep(1)
active_element.send_keys(text3)
time.sleep(300/1000)
active_element.send_keys(Keys.SPACE)
time.sleep(300/1000)
active_element.send_keys(Keys.ENTER)
time.sleep(300)
