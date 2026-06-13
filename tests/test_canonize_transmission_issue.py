import unittest

from scripts.canonize_transmission_issue import should_canonize


def issue_event(action, labels, event_label=None):
    event = {
        "action": action,
        "issue": {
            "labels": [{"name": label} for label in labels],
        },
    }
    if event_label is not None:
        event["label"] = {"name": event_label}
    return event


class CanonizeLabelTests(unittest.TestCase):
    def test_labeled_event_accepts_approval_labels_case_insensitively(self):
        accepted = [
            "canonize",
            "Canonize",
            "approved",
            "Approved",
            "Active Canon",
            "active canon",
            "ACTIVE CANON",
        ]

        for label in accepted:
            with self.subTest(label=label):
                self.assertTrue(should_canonize(issue_event("labeled", [label], label)))

    def test_closed_event_accepts_existing_approval_label_case_insensitively(self):
        self.assertTrue(should_canonize(issue_event("closed", ["Approved"])))
        self.assertTrue(should_canonize(issue_event("closed", ["ACTIVE CANON"])))

    def test_blocking_labels_prevent_canonization_case_insensitively(self):
        blockers = ["canonized", "Canonized", "do-not-canonize", "Needs-Revision"]

        for blocker in blockers:
            with self.subTest(blocker=blocker):
                self.assertFalse(should_canonize(issue_event("labeled", ["approved", blocker], "approved")))

    def test_non_approval_labels_do_not_canonize(self):
        self.assertFalse(should_canonize(issue_event("labeled", ["transmission-request"], "transmission-request")))
        self.assertFalse(should_canonize(issue_event("closed", ["transmission-request"])))


if __name__ == "__main__":
    unittest.main()
