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
path_to_chromedriver = 'C:/Users/mrthe/bootcamp/pydiscordbrowser/chromedriver.exe'
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
options = webdriver.ChromeOptions()
options.add_argument('--headless=False')


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

# Navigate to server and channel via URL
time.sleep(5)
driver.get("https://discord.com/channels/1063538236900782220/1063538236900782223")

# Post in the channel
time.sleep(3)
# Get the active element
active_element = driver.execute_script("return document.activeElement")
time.sleep(1)
# Print the element to the console
print(active_element.get_attribute("outerHTML"))
time.sleep(1)

# Send input to the active element
# command = sys.stdin.readline().strip()
prompt = "Old woman in mercedes benz convertible on a mountain road"

active_element.send_keys("/")
time.sleep(1)
active_element.send_keys("i")
time.sleep(1)
active_element.send_keys(Keys.ENTER)
time.sleep(1)
active_element.send_keys(prompt)
time.sleep(300/1000)
active_element.send_keys(Keys.SPACE)
time.sleep(300/1000)
active_element.send_keys(Keys.ENTER)
time.sleep(240)
