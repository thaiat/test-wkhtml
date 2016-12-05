'use strict';

const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');
const path = require('path');
var chai = require('chai');
var chaiFs = require('chai-fs');
var expect = chai.expect;

chai.use(chaiFs);

describe('Test wkhtmltopdf', () => {
    it('should succeed', (done) => {
        let filePath = path.join(__dirname, '..', 'results', 'out.pdf');
        var output = fs.createWriteStream(filePath);
        output.on('finish', function () {
            expect(filePath).to.be.a.file();
            expect(fs.statSync(filePath).size).to.be.greaterThan(0);
            done();
        });

        wkhtmltopdf('http://google.com/', {
                pageSize: 'letter'
            })
            .pipe(output);


    });
});