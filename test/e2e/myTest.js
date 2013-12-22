describe('angularjs homepage', function() 
{
  it('should greet the named user', function() 
  {
    browser.get('http://localhost:1313/index.html');
    
    var firstActor = element(by.repeater('actor in actors')).row(0);
    
    var greeting = element(by.binding('yourName'));
    
    expect(greeting.getText()).toEqual('Hello Julie!');
  });
});