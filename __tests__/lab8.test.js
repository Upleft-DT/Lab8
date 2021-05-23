describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    const url = page.url();
    expect(url.includes("/#entry1")).toBe(true);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const h =  await page.$eval('header > h1', el => el.innerText);
    expect(h).toEqual("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        const testContent = { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        };

        const ep =  await page.$eval('entry-page', el => el.entry);
        expect(ep).toEqual(testContent);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const el = await page.evaluate( () => document.body.className );
    expect(el).toEqual('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('[src="./styles/settings.svg"]');
    const url = page.url();
    expect(url.includes("/#settings")).toBe(true);

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const h =  await page.$eval('header > h1', el => el.innerText);
    expect(h).toEqual("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const el = await page.evaluate( () => document.body.className );
    expect(el).toEqual('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = page.url();
    expect(url.includes("/#entry1")).toBe(true);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button', async() => {
    await page.goBack();
    const url = page.url();
    expect(url.includes("/#entry1")).toBe(false);
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On the home page - checking header', async() => {
    const h =  await page.$eval('header > h1', el => el.innerText);
    expect(h).toEqual("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page - checking body element', async() => {
    const el = await page.evaluate( () => document.body.className );
    expect(el).toEqual("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second entry - checking url', async() => {
    await page.click('main > journal-entry:nth-child(2)');
    const url = page.url();
    expect(url.includes("/#entry2")).toBe(true);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On the second entry - checking title', async() => {
    const h =  await page.$eval('header > h1', el => el.innerText);
    expect(h).toEqual("Entry 2");
  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On the second entry - checking <entry-page> contents', async () => {
        const testContent = {
          "date":"4/26/2021",
          "title":"Run, Forrest! Run!",
          "content":"Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          "image":{
            "src":"https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
            "alt":"forrest running"
          },
          "audio":null
        };

        const ep =  await page.$eval('entry-page', el => el.entry);
        expect(ep.date).toEqual(testContent.date);
        expect(ep.title).toEqual(testContent.title);
  }, 10000);

  // create your own test 17
  it('Test17: Clicking the back button then forward button', async() => {
    await page.goBack();
    await page.goForward();
    const url = page.url();
    expect(url.includes("/#entry2")).toBe(true);
  });
  // create your own test 18
  it('Test18: Clicking the home page button', async() => {
    await page.click('header > h1');
    const el = await page.evaluate( () => document.body.className );
    expect(el).toEqual("");
  });
  // create your own test 19
  it('Test19: On the home page - check the title', async() => {
    const h =  await page.$eval('header > h1', el => el.innerText);
    expect(h).toEqual("Journal Entries");
  });
  // create your own test 20
  it('Test20: On the home page - check the url', async() => {
    const url = page.url();
    expect(url.includes("/#entry2")).toBe(false);
  });
});
