export default {
    name: 'TheDocFormComponent',
    template: `
        <form @submit.prevent="handleSubmit" class="edge-yellow">
            </br>
            <label for="name">Name:</label>
            <input placeholder="Type your name here"  type="text" id="name" v-model="name" required>

            <label for="email">Email:</label>
            <input placeholder="Type your email here"  type="email" id="email" v-model="email" required>

            <label for="hospital">Hospital/Clinic:</label>
            <input placeholder="Type your workplace here"  type="text" id="hospital" v-model="hospital" required>

            <label for="message">Message:</label>
            <textarea placeholder="Type your message here"  id="message" v-model="message" required></textarea>

            <button type="submit" class="fnd-button btn-dark"><span>Submit</span></button>
        </form>
    `,
    methods: {
        async handleSubmit() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('hospital', this.hospital);
            formData.append('message', this.message);

            try {
                const response = await fetch('includes/doc_submit_form.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    alert('Form submitted successfully!');
                    // Clear form fields if needed
                    this.name = '';
                    this.email = '';
                    this.hospital = '';
                    this.message = '';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while submitting the form. Please try again later.');
            }
        }
    },
    data() {
        return {
            name: '',
            email: '',
            hospital: '',
            message: ''
        };
    }
}