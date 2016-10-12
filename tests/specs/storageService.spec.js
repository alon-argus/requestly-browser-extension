describe('Storage Service', function() {
  beforeEach(function() {
    StorageService.records = [];
    StorageService.isRecordsFetched = false;
  });

  describe('#getCachedRecordIndex ', function() {
    it('should return index where {key} matches with {id} in cached records', function() {
      StorageService.records.push({ id: 100, key: 'name', value: 'sachin' });
      StorageService.records.push({ id: 200, key: 'age', value: 25 });

      expect(StorageService.getCachedRecordIndex(200)).toBe(1);
    });

    it('should return -1 where {key} does not match with {id} in cached records', function() {
      StorageService.records.push({ id: 100, key: 'name', value: 'sachin' });
      StorageService.records.push({ id: 200, key: 'age', value: 25 });

      expect(StorageService.getCachedRecordIndex(300)).toBe(-1);
    });

    it('should return -1 where there are no cached records', function() {
      expect(StorageService.getCachedRecordIndex(100)).toBe(-1);
    });
  });

  describe('#updateRecords ', function() {
    it('should add new record when oldValue is undefined', function() {
      // Initially numRecords should be 0
      expect(StorageService.records.length).toBe(0);

      var changes = {
        'REPLACE_100': {
          newValue: { id: 'REPLACE_100', type: RQ.RULE_TYPES.REPLACE }
        },
        'HEADERS_500': {
          newValue: { id: 'HEADERS_500', type: RQ.RULE_TYPES.HEADERS }
        }
      };

      StorageService.updateRecords(changes, RQ.browserConfigs.storageType);
      expect(StorageService.records.length).toBe(2);
      expect(StorageService.getCachedRecordIndex('REPLACE_100')).toBe(0);
      expect(StorageService.getCachedRecordIndex('HEADERS_500')).toBe(1);
    });

    it('should update existing record when oldValue and newValue are defined', function() {
      // Initially numRecords should be 0
      expect(StorageService.records.length).toBe(0);

      StorageService.records.push({ id: 'REPLACE_100', type: RQ.RULE_TYPES.REPLACE, value: 'R1' });
      expect(StorageService.records.length).toBe(1);

      var changes = {
        'REPLACE_100': {
          oldValue: { id: 100, type: RQ.RULE_TYPES.REPLACE, value: 'R1' },
          newValue: { id: 100, type: RQ.RULE_TYPES.REPLACE, value: 'R2' }
        }
      };

      StorageService.updateRecords(changes, RQ.browserConfigs.storageType);
      expect(StorageService.records[0].value).toBe('R2');
    });

    it('should remove record when newValue is undefined', function() {
      // Initially numRecords should be 0
      expect(StorageService.records.length).toBe(0);

      StorageService.records.push({ id: 'REPLACE_100', type: RQ.RULE_TYPES.REPLACE, value: 'R1' });
      StorageService.records.push({ id: 'REPLACE_200', type: RQ.RULE_TYPES.REPLACE, value: 'R2' });
      StorageService.records.push({ id: 'REPLACE_300', type: RQ.RULE_TYPES.REPLACE, value: 'R3' });

      expect(StorageService.getCachedRecordIndex('REPLACE_100')).toBe(0);
      expect(StorageService.getCachedRecordIndex('REPLACE_200')).toBe(1);
      expect(StorageService.getCachedRecordIndex('REPLACE_300')).toBe(2);

      var changes = {
        'REPLACE_100': {
          oldValue: { id: 100, type: RQ.RULE_TYPES.REPLACE, value: 'R1' }
        },

        'REPLACE_200': {
          oldValue: { id: 200, type: RQ.RULE_TYPES.REPLACE, value: 'R2' }
        }
      };

      StorageService.updateRecords(changes, RQ.browserConfigs.storageType);
      expect(StorageService.records.length).toBe(1);
      expect(StorageService.getCachedRecordIndex('REPLACE_100')).toBe(-1);
      expect(StorageService.getCachedRecordIndex('REPLACE_200')).toBe(-1);
    });

    it('should not cache record when record has {avoidCache} set to true', function() {
      // Initially numRecords should be 0
      expect(StorageService.records.length).toBe(0);

      var changes = {
        'REDIRECT_100': {
          newValue: { id: 'REDIRECT_100', type: RQ.RULE_TYPES.REDIRECT, value: 'R1' }
        },

        'REPLACE_200': {
          newValue: { id: 'REPLACE_200', type: RQ.RULE_TYPES.REPLACE, value: 'R2', avoidCache: true }
        }
      };

      StorageService.updateRecords(changes, RQ.browserConfigs.storageType);

      expect(StorageService.records.length).toBe(1);
      expect(StorageService.getCachedRecordIndex('REDIRECT_100')).toBe(0);
      expect(StorageService.getCachedRecordIndex('REPLACE_200')).toBe(-1);
    });
  });
});