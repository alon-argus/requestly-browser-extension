describe('Utility functions', function() {

  it('should have Regex format', function() {
    expect(RQ.Utils.regexFormat).toBe('^\/(.+)\/(|i|g|ig|gi)$');
  });

  it('should validate Regex', function() {
    expect(RQ.Utils.isValidRegex('/test/i')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('/test/')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('test')).toBeFalsy();
    expect(RQ.Utils.isValidRegex('/test/g')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('/test[0-9]/gi')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('/test/g')).toBeTruthy();
  });

  it('should convert given string to regex', function() {
    expect(RQ.Utils.toRegex('/test/i') instanceof RegExp).toBe(true);
    expect(RQ.Utils.toRegex('test')).toBeNull();
  });

  it('should validate Url', function() {
    expect(RQ.Utils.isValidUrl('google.com')).toBe(false);
    expect(RQ.Utils.isValidUrl('http://www.example.com')).toBe(true);
    expect(RQ.Utils.isValidUrl('http.example.com')).toBe(false);
    expect(RQ.Utils.isValidUrl('javascript:alert("works")')).toBe(true);
  });

  it('should remove last part', function() {
    expect(RQ.Utils.removeLastPart('sharedList/1455023747986/19', '/')).toBe('sharedList/1455023747986');
    expect(RQ.Utils.removeLastPart('a-b-c', '-')).toBe('a-b');
    expect(RQ.Utils.removeLastPart('1-2-3', '|')).toBe('1-2-3');
    expect(RQ.Utils.removeLastPart('abc', 'b')).toBe('a');
  });
});