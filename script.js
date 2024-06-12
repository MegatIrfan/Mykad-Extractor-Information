document.getElementById('mykadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const mykad = document.getElementById('mykadInput').value;
    const results = document.getElementById('results');
    const birthdayElement = document.getElementById('birthday');
    const genderElement = document.getElementById('gender');
    const regionElement = document.getElementById('region');

    if (!validateMyKad(mykad)) {
        // If MyKad is invalid, show SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Invalid MyKad number',
            text: 'Please enter a valid MyKad number.',
        });
        return;
    }

    // Extract birthday
    const year = mykad.substring(0, 2);
    const month = mykad.substring(2, 4);
    const day = mykad.substring(4, 6);
    const fullYear = (parseInt(year) < 50 ? '20' : '19') + year;
    const birthday = `${day}-${month}-${fullYear}`;
    
    // Extract gender
    const gender = parseInt(mykad.charAt(11)) % 2 === 0 ? 'Female' : 'Male';

    // Extract region
    const regionCode = mykad.substring(6, 8);
    const region = getRegion(regionCode);

    // Display results
    birthdayElement.textContent = birthday;
    genderElement.textContent = gender;
    regionElement.textContent = region;
    results.style.display = 'block';
});

function validateMyKad(mykad) {
    // Simple validation for MyKad length and numeric value
    return mykad.length === 12 && /^\d+$/.test(mykad);
}

function getRegion(code) {
    const regions = {
        '01': 'Johor',
        '02': 'Kedah',
        '03': 'Kelantan',
        '04': 'Malacca',
        '05': 'Negeri Sembilan',
        '06': 'Pahang',
        '07': 'Penang',
        '08': 'Perak',
        '09': 'Perlis',
        '10': 'Selangor',
        '11': 'Terengganu',
        '12': 'Sabah',
        '13': 'Sarawak',
        '14': 'Federal Territory of Kuala Lumpur',
        '15': 'Federal Territory of Labuan',
        '16': 'Federal Territory of Putrajaya'
    };
    return regions[code] || 'Unknown region';
}
